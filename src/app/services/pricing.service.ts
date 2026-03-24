import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { CustomItem, PricingState } from '../data/services-catalog';

const PRICES_DOC_PATH = 'pricing/services';

@Injectable({
  providedIn: 'root',
})
export class PricingService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly pricesDoc = this.firestore.doc<any>(PRICES_DOC_PATH);

  readonly state$ = this.pricesDoc.valueChanges().pipe(
    map(
      (doc): PricingState => ({
        prices: doc?.prices ?? {},
        removed: doc?.removed ?? [],
        custom: (doc?.custom ?? []) as CustomItem[],
      }),
    ),
  );

  /** @deprecated use state$ */
  readonly prices$ = this.state$.pipe(map((s) => s.prices));

  updateState(state: PricingState): Promise<void> {
    return this.pricesDoc.set(
      { prices: state.prices, removed: state.removed, custom: state.custom },
      { merge: true },
    );
  }

  /** @deprecated use updateState */
  updatePrices(prices: Record<string, string>): Promise<void> {
    return this.pricesDoc.set({ prices }, { merge: true });
  }

  constructor(private firestore: AngularFirestore) {}
}
