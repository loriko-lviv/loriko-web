import {Injectable} from '@angular/core';
import {CanActivate, Router, UrlTree} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {from, map, Observable, of, switchMap, take} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private auth: AngularFireAuth, private router: Router) {
  }

  canActivate(): Observable<boolean | UrlTree> {
    return this.auth.authState.pipe(
      take(1),
      switchMap((user) => {
        if (!user) {
          return of(true);
        }

        return from(user.getIdTokenResult(true)).pipe(
          map((result) =>
            result.claims?.['admin'] === true
              ? true
              : this.router.parseUrl('/')
          )
        );
      })
    );
  }
}
