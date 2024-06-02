import {Component} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-header-nav',
  standalone: true,
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss'],
  imports: [
    MatIconModule,
    RouterLink
  ],
})
export class HeaderNavComponent {

}
