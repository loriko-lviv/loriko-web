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
import {
  AdditionalInformationComponent
} from './pages/home/sections/additional-information/additional-information.component';
import {NgxMaskDirective} from "ngx-mask";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatInputModule} from "@angular/material/input";
import {PhoneMaskModule} from "../../shared/directives/phone-mask/phone-mask.module";

@NgModule({
    imports: [HomeRouting, CommonModule, MatIconModule, SectionTitleModule, NgxMaskDirective, HttpClientModule, ReactiveFormsModule, MatSnackBarModule, MatInputModule, PhoneMaskModule],
  declarations: [
    HomeComponent,
    OurEmployeesComponent,
    OurServicesComponent,
    AboutClinicComponent,
    AvailabilityTimeComponent,
    ContactFormComponent,
    AdditionalInformationComponent,
  ],
  providers: [],
})
export class HomeModule {
}
