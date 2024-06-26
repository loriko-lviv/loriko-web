import {Component} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-header-nav',
  standalone: true,
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss'],
  imports: [
    CommonModule,
    MatIconModule,
    RouterLink,
    MatButtonModule
  ],
})
export class HeaderNavComponent {
  isMenuOpen = false;
  private _ngOnDestroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.fragment
      .pipe(takeUntil(this._ngOnDestroy$))
      .subscribe(() => {
        this.isMenuOpen = false;
      });
  }

  ngOnDestroy(): void {
    this._ngOnDestroy$.next();
    this._ngOnDestroy$.complete();
  }
}
