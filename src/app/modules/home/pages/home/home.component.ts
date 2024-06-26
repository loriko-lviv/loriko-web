import {Component, OnDestroy} from '@angular/core';
import {Meta} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  private _ngOnDestroy$ = new Subject<void>();

  constructor(private meta: Meta, private route: ActivatedRoute) {
    this.meta.addTag({
      name: 'description',
      content: 'Приватна клініка отоларингології і косметології - ЛОР і Ко у Львові'
    });
  }

  ngOnInit() {
    this.route.fragment
      .pipe(takeUntil(this._ngOnDestroy$))
      .subscribe((fragment: string | null) => {
        if (fragment) {
          const element = document.querySelector(`#${fragment}`);
          const navigationRect = document.querySelector('#header-information');

          if (element && navigationRect) {
            const currElemRect = element.getBoundingClientRect();
            const currentElemPosition = window.scrollY + currElemRect.top;
            window.scrollTo(0, currentElemPosition - navigationRect.clientHeight);
          }
        } else {
          window.scrollTo(0, 0);
        }
      });
  }

  ngOnDestroy() {
    this._ngOnDestroy$.next();
    this._ngOnDestroy$.complete();
  }
}
