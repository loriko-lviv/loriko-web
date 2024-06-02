import {RouterModule, Routes} from '@angular/router';
import {RabaGaliaComponent} from "./pages/raba-galia/raba-galia.component";
import {RabaBohdanComponent} from "./pages/raba-bohdan/raba-bohdan.component";
import {KorotinaKhristinaComponent} from "./pages/korotina-khristina/korotina-khristina.component";

const routes: Routes = [
  {
    path: 'raba-galia',
    component: RabaGaliaComponent,
  },
  {
    path: 'raba-bohdan',
    component: RabaBohdanComponent,
  },
  {
    path: 'korotina-khristina',
    component: KorotinaKhristinaComponent,
  }
];

export const DoctorsRouting = RouterModule.forChild(routes);
