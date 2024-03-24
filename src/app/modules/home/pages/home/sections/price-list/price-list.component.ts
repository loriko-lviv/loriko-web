import { Component } from '@angular/core';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss']
})
export class PriceListComponent {

  readonly priceList = [
    {account: {title: 'Послуги Лора'}, services: [{title: 'Консультація', price: 0}, {title: 'Консультація', price: 0}, {title: 'Консультація', price: 0}]},
    {account: {title: 'Послуги косметолога'}, services: [{title: 'Консультація', price: 0}, {title: 'Консультація', price: 0}, {title: 'Консультація', price: 0}]},
  ]

}
