import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PricingService } from '../../../../../../services/pricing.service';
import {
  buildServicesWithIds,
  ServiceListItemWithId,
  ServiceTypeWithId,
} from '../../../../../../data/services-catalog';

export interface FilteredItem {
  id: string;
  title: string;
  price?: string;
  children: { id: string; title: string; price?: string }[];
  isGroup: boolean;
}

export interface FilteredGroup {
  type: string;
  items: FilteredItem[];
  matchCount: number;
}

@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.scss'],
})
export class OurServicesComponent implements OnDestroy {
  private allServices: ServiceTypeWithId[] = buildServicesWithIds();
  filteredGroups: FilteredGroup[] = [];
  activeTab = 0;
  query = '';

  private readonly destroy$ = new Subject<void>();

  constructor(private pricingService: PricingService) {
    this.pricingService.state$
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        this.allServices = buildServicesWithIds(state);
        this.applyFilter();
      });
    this.applyFilter();
  }

  onSearch(value: string): void {
    this.query = value;
    this.activeTab = 0;
    this.applyFilter();
  }

  clearSearch(): void {
    this.query = '';
    this.applyFilter();
  }

  selectTab(index: number): void {
    this.activeTab = index;
  }

  get activeGroup(): FilteredGroup | null {
    return this.filteredGroups[this.activeTab] ?? null;
  }

  get totalMatches(): number {
    return this.filteredGroups.reduce((s, g) => s + g.matchCount, 0);
  }

  private matchesQuery(text: string): boolean {
    if (!this.query.trim()) return true;
    return text.toLowerCase().includes(this.query.trim().toLowerCase());
  }

  private filterItem(item: ServiceListItemWithId): FilteredItem | null {
    const titleMatch = this.matchesQuery(item.title);

    if (item.list?.length) {
      // Group item — check children
      const matchedChildren = item.list.filter(
        (c) => this.matchesQuery(c.title) || titleMatch,
      );
      if (!titleMatch && matchedChildren.length === 0) return null;
      return {
        id: item.id,
        title: item.title,
        price: item.price,
        children: (titleMatch ? item.list : matchedChildren).map((c) => ({
          id: c.id,
          title: c.title,
          price: c.price,
        })),
        isGroup: true,
      };
    }

    if (!titleMatch) return null;
    return {
      id: item.id,
      title: item.title,
      price: item.price,
      children: [],
      isGroup: false,
    };
  }

  private applyFilter(): void {
    this.filteredGroups = this.allServices.map((service) => {
      const items = service.list
        .map((item) => this.filterItem(item))
        .filter((x): x is FilteredItem => x !== null);

      const matchCount = items.reduce(
        (sum, fi) => sum + (fi.isGroup ? fi.children.length : 1),
        0,
      );

      return { type: service.type, items, matchCount };
    });

    // When searching, jump to first tab that has results
    if (this.query.trim()) {
      const firstHit = this.filteredGroups.findIndex((g) => g.matchCount > 0);
      this.activeTab = firstHit >= 0 ? firstHit : 0;
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
