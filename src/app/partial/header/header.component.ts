import {Component} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  scrollToElementById(id: string) {
    const element = this.getElementById(id);
    if (element) {
      this.scrollToElement(element);
    }
  }

  private getElementById(id: string): HTMLElement | null {
    return document.getElementById(id);
  }

  private scrollToElement(element: HTMLElement) {
    element.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});
  }
}
