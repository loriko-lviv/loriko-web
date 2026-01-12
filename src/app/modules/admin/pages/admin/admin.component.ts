import {Component, OnDestroy} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Router} from '@angular/router';
import {Subject, from, map, of, switchMap, take, takeUntil} from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {
  buildServicesWithIds,
  extractPrices,
  ServiceTypeWithId,
} from '../../../../data/services-catalog';
import {PricingService} from '../../../../services/pricing.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnDestroy {
  services: ServiceTypeWithId[] = buildServicesWithIds();
  isAdmin = false;
  loading = false;
  saving = false;
  statusMessage = '';
  statusTone: 'error' | 'success' | '' = '';
  private readonly destroy$ = new Subject<void>();

  constructor(
    private auth: AngularFireAuth,
    private pricingService: PricingService,
    private router: Router
  ) {
    this.auth.authState
      .pipe(
        takeUntil(this.destroy$),
        switchMap((user) => {
          if (!user) {
            return of({user: null, isAdmin: false});
          }

          return from(user.getIdTokenResult(true)).pipe(
            map((result) => ({
              user,
              isAdmin: result.claims?.['admin'] === true,
            }))
          );
        })
      )
      .subscribe(({user, isAdmin}) => {
        if (user && !isAdmin) {
          this.statusMessage = 'Доступ заборонено для цього акаунта.';
          this.statusTone = 'error';
          this.auth.signOut();
          this.router.navigateByUrl('/');
          return;
        }

        this.isAdmin = isAdmin;

        if (this.isAdmin) {
          this.loadPrices();
        } else {
          this.services = buildServicesWithIds();
        }
      });
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

  savePrices() {
    if (!this.isAdmin) {
      return;
    }

    this.saving = true;
    this.statusMessage = '';
    this.statusTone = '';

    const prices = extractPrices(this.services);
    this.pricingService
      .updatePrices(prices)
      .then(() => {
        this.statusMessage = 'Ціни збережено.';
        this.statusTone = 'success';
      })
      .catch(() => {
        this.statusMessage = 'Не вдалося зберегти ціни.';
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

  private loadPrices() {
    this.loading = true;
    this.pricingService.prices$
      .pipe(take(1))
      .subscribe({
        next: (prices) => {
          this.services = buildServicesWithIds(prices);
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
