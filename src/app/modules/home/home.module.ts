import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {HomeComponent} from './pages/home/home.component';
import {HomeRouting} from "./home.routing";
import {OurEmployeesComponent} from './pages/home/sections/our-employees/our-employees.component';
import {OurServicesComponent} from './pages/home/sections/our-services/our-services.component';
import {AboutClinicComponent} from './pages/home/sections/about-clinic/about-clinic.component';
import {AvailabilityTimeComponent} from "./pages/home/sections/availability-time/availability-time.component";
import {ContactFormComponent} from "./pages/home/sections/contact-form/contact-form.component";
import {MatIconModule} from "@angular/material/icon";
import {SectionTitleModule} from "../../shared/section-title/section-title.module";

@NgModule({
  imports: [HomeRouting, CommonModule, MatIconModule, SectionTitleModule],
  declarations: [
    HomeComponent,
    OurEmployeesComponent,
    OurServicesComponent,
    AboutClinicComponent,
    AvailabilityTimeComponent,
    ContactFormComponent,
  ],
  providers: [],
})
export class HomeModule {
}
