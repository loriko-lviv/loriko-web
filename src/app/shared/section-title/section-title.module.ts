import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {SectionTitleComponent} from "./section-title.component";

@NgModule({
  imports: [CommonModule, MatIconModule],
  declarations: [
    SectionTitleComponent
  ],
  exports: [
    SectionTitleComponent
  ],
  providers: [],
})
export class SectionTitleModule {
}
