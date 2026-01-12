import {Component, OnDestroy} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {PricingService} from '../../../../../../services/pricing.service';
import {
  buildServicesWithIds,
  ServiceTypeWithId,
} from '../../../../../../data/services-catalog';

@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.scss'],
})
export class OurServicesComponent implements OnDestroy {
  services: ServiceTypeWithId[] = buildServicesWithIds();
  private readonly destroy$ = new Subject<void>();

  constructor(private pricingService: PricingService) {
    this.pricingService.prices$
      .pipe(takeUntil(this.destroy$))
      .subscribe((prices) => {
        this.services = buildServicesWithIds(prices);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
