import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainLayoutComponent} from "./layouts/main-layout/main-layout.component";
import {DoctorsLayoutComponent} from "./layouts/doctors-layout/doctors-layout.component";

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
      },
    ]
  },
  {
    path: 'doctors',
    component: DoctorsLayoutComponent,
    loadChildren: () => import('./modules/doctors/doctors.module').then(m => m.DoctorsModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
