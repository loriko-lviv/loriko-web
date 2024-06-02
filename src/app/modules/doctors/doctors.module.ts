import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {SectionTitleModule} from "../../shared/section-title/section-title.module";
import {DoctorsRouting} from "./doctors.routing";
import {KorotinaKhristinaComponent} from './pages/korotina-khristina/korotina-khristina.component';
import {RabaGaliaComponent} from './pages/raba-galia/raba-galia.component';
import {RabaBohdanComponent} from './pages/raba-bohdan/raba-bohdan.component';

@NgModule({
  imports: [
    DoctorsRouting,
    CommonModule,
    MatIconModule,
    SectionTitleModule,
  ],
  declarations: [
    KorotinaKhristinaComponent,
    RabaGaliaComponent,
    RabaBohdanComponent
  ],
  providers: [],
})
export class DoctorsModule {
}
