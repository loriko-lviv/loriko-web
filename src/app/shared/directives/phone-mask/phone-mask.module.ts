import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PhoneMaskDirective} from './phone-mask.directive';


@NgModule({
  declarations: [
    PhoneMaskDirective
  ],
  exports: [
    PhoneMaskDirective
  ],
  imports: [
    CommonModule
  ]
})
export class PhoneMaskModule {
}
