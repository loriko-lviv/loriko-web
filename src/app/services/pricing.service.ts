import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {map} from 'rxjs';

interface PricesDocument {
  prices: Record<string, string>;
}

const PRICES_DOC_PATH = 'pricing/services';

@Injectable({
  providedIn: 'root',
})
export class PricingService {
  private readonly pricesDoc = this.firestore.doc<PricesDocument>(
    PRICES_DOC_PATH
  );

  readonly prices$ = this.pricesDoc.valueChanges().pipe(
    map((doc) => doc?.prices ?? {})
  );

  updatePrices(prices: Record<string, string>) {
    return this.pricesDoc.set({prices}, {merge: true});
  }

  constructor(private firestore: AngularFirestore) {
  }
}
