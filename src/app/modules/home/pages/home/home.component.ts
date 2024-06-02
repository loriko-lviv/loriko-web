import { Component } from '@angular/core';
import {Meta} from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private meta: Meta) {
    this.meta.addTag({ name: 'description', content: 'Приватна клініка отоларингології і косметології - ЛОР і Ко у Львові' });
  }
}
