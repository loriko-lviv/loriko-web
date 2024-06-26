import {AfterViewInit, Directive} from "@angular/core";

@Directive()
export class DoctorsBase implements AfterViewInit {
  yearTitle(years: number): string {
    const titles = ['рік', 'роки', 'років'];
    const cases = [2, 0, 1, 1, 1, 2];
    return `${titles[years % 100 > 4 && years % 100 < 20 ? 2 : cases[years % 10 < 5 ? years % 10 : 5]]}`;
  }

  ngAfterViewInit(): void {
    window.scrollTo(0, 0);
  }
}
