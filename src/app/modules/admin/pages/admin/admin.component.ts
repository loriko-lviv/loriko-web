import { Component, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Subject, from, map, of, switchMap, take, takeUntil } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {
  buildServicesWithIds,
  extractPrices,
  ServiceTypeWithId,
  ServiceListItemWithId,
  CustomItem,
  PricingState,
} from '../../../../data/services-catalog';
import { PricingService } from '../../../../services/pricing.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnDestroy {
  services: ServiceTypeWithId[] = buildServicesWithIds();
  isAdmin = false;
  authChecking = true;
  loading = false;
  saving = false;
  statusMessage = '';
  statusTone: 'error' | 'success' | '' = '';

  activeTab = 0;
  removedIds: string[] = [];
  customItems: CustomItem[] = [];

  showAddDialog = false;
  showDeleteDialog = false;
  showReviewDialog = false;
  deleteTarget: { label: string; childCount: number } | null = null;
  private pendingDelete: (() => void) | null = null;

  private originalPrices: Record<string, string> = {};
  private originalIdTitleMap: Record<string, string> = {};

  private readonly destroy$ = new Subject<void>();

  constructor(
    private auth: AngularFireAuth,
    private pricingService: PricingService,
    private router: Router,
  ) {
    this.auth.authState
      .pipe(
        takeUntil(this.destroy$),
        switchMap((user) => {
          if (!user) return of({ user: null, isAdmin: false });
          return from(user.getIdTokenResult(true)).pipe(
            map((result) => ({
              user,
              isAdmin: result.claims?.['admin'] === true,
            })),
          );
        }),
      )
      .subscribe(({ user, isAdmin }) => {
        this.authChecking = false;
        if (user && !isAdmin) {
          this.statusMessage = 'Доступ заборонено для цього акаунта.';
          this.statusTone = 'error';
          this.auth.signOut();
          this.router.navigateByUrl('/');
          return;
        }
        this.isAdmin = isAdmin;
        if (this.isAdmin) {
          this.loadState();
        } else {
          this.services = buildServicesWithIds();
        }
      });
  }

  get changeReview() {
    const currentPrices = extractPrices(this.services);
    const modified = Object.entries(currentPrices)
      .filter(
        ([id, price]) =>
          id in this.originalPrices && this.originalPrices[id] !== price,
      )
      .map(([id, price]) => ({
        title: this.originalIdTitleMap[id] ?? id,
        oldPrice: this.originalPrices[id],
        newPrice: price,
      }));
    const removed = this.removedIds.map((id) => ({
      title: this.originalIdTitleMap[id] ?? id,
    }));
    const added = this.customItems.map((c) => ({
      title: c.title,
      price: c.price,
      groupName: this.services[c.groupIndex]?.type ?? '',
      parentTitle: c.parentItemId
        ? this.originalIdTitleMap[c.parentItemId] ||
          this.services[c.groupIndex]?.list.find(
            (item) => item.id === c.parentItemId,
          )?.title
        : undefined,
    }));
    return { modified, removed, added };
  }

  get hasChanges(): boolean {
    const r = this.changeReview;
    return r.modified.length > 0 || r.removed.length > 0 || r.added.length > 0;
  }

  get totalChanges(): number {
    const r = this.changeReview;
    return r.modified.length + r.removed.length + r.added.length;
  }

  signIn() {
    this.statusMessage = '';
    this.statusTone = '';
    return this.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((credential) => credential.user?.getIdTokenResult(true));
  }

  signOut() {
    this.statusMessage = '';
    this.statusTone = '';
    return this.auth.signOut();
  }

  onRemoveTopLevel(event: { serviceIndex: number; itemIndex: number }) {
    const service = this.services[event.serviceIndex];
    const item = service?.list[event.itemIndex];
    if (!item) return;
    this.deleteTarget = {
      label: item.title,
      childCount: item.list?.length ?? 0,
    };
    this.pendingDelete = () => {
      this.removedIds.push(item.id);
      item.list?.forEach((child) => this.removedIds.push(child.id));
      service.list.splice(event.itemIndex, 1);
    };
    this.showDeleteDialog = true;
  }

  onRemoveChild(event: {
    serviceIndex: number;
    parentIndex: number;
    childIndex: number;
  }) {
    const parent = this.services[event.serviceIndex]?.list[event.parentIndex];
    if (!parent?.list) return;
    const child = parent.list[event.childIndex];
    if (!child) return;
    this.deleteTarget = { label: child.title, childCount: 0 };
    this.pendingDelete = () => {
      this.removedIds.push(child.id);
      parent.list!.splice(event.childIndex, 1);
    };
    this.showDeleteDialog = true;
  }

  confirmDelete() {
    this.pendingDelete?.();
    this.closeDeleteDialog();
  }

  closeDeleteDialog() {
    this.showDeleteDialog = false;
    this.deleteTarget = null;
    this.pendingDelete = null;
  }

  onAddConfirm(data: {
    groupIndex: number;
    parentId: string | null;
    title: string;
    price: string;
  }) {
    const id = `custom-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const newCustom: CustomItem = {
      id,
      groupIndex: data.groupIndex,
      ...(data.parentId ? { parentItemId: data.parentId } : {}),
      title: data.title,
      price: data.price,
    };
    const newItem: ServiceListItemWithId = {
      id,
      title: data.title,
      price: data.price,
      editable: true,
    };
    this.customItems.push(newCustom);
    if (data.parentId) {
      const parent = this.services[data.groupIndex].list.find(
        (item) => item.id === data.parentId,
      );
      if (parent) parent.list = [...(parent.list ?? []), newItem];
    } else {
      this.services[data.groupIndex].list.push(newItem);
    }
    this.activeTab = data.groupIndex;
    this.showAddDialog = false;
  }

  savePrices() {
    if (!this.isAdmin) return;
    this.showReviewDialog = false;
    this.saving = true;
    this.statusMessage = '';
    this.statusTone = '';
    const state: PricingState = {
      prices: extractPrices(this.services),
      removed: this.removedIds,
      custom: this.customItems,
    };
    this.pricingService
      .updateState(state)
      .then(() => {
        this.statusMessage = 'Ціни успішно збережено.';
        this.statusTone = 'success';
      })
      .catch(() => {
        this.statusMessage = 'Не вдалося зберегти. Спробуйте ще раз.';
        this.statusTone = 'error';
      })
      .finally(() => {
        this.saving = false;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadState() {
    this.loading = true;
    this.pricingService.state$.pipe(take(1)).subscribe({
      next: (state) => {
        this.removedIds = [...(state.removed ?? [])];
        this.customItems = [...(state.custom ?? [])];
        this.services = buildServicesWithIds(state);
        this.originalPrices = { ...state.prices };
        const visitItems = (items: ServiceListItemWithId[]) => {
          items.forEach((item) => {
            this.originalIdTitleMap[item.id] = item.title;
            if (item.list) visitItems(item.list);
          });
        };
        this.services.forEach((s) => visitItems(s.list));
        this.loading = false;
      },
      error: () => {
        this.statusMessage = 'Не вдалося завантажити ціни.';
        this.statusTone = 'error';
        this.loading = false;
      },
    });
  }
}
