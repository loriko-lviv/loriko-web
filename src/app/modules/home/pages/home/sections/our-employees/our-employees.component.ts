import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-our-employees',
  templateUrl: './our-employees.component.html',
  styleUrls: ['./our-employees.component.scss']
})
export class OurEmployeesComponent {
  constructor(private router: Router) {
  }

  readonly employees = [
    {
      firstname: 'Богдан Мирославович',
      lastname: 'Раба',
      description: 'Лікар-отоларинголог. Стаж більше 10 років',
      router: ['/doctors', 'raba-bohdan'],
      imageUrl: '/assets/l-kar-otorinolaringolog-back.webp',
    },
    {
      firstname: 'Галина Іванівна',
      lastname: 'Раба',
      description: 'Лікар-косметолог. Стаж більше 10 років',
      router: ['/doctors', 'raba-galia'],
      imageUrl: '/assets/l-kar-kosmetolog.webp',
    },
    {
      firstname: 'Христина Вікторівна',
      lastname: 'Коротіна',
      description: 'Лікар-отоларинголог. Стаж більше 2 років',
      router: ['/doctors', 'korotina-khristina'],
      imageUrl: '/assets/korotina_kh.webp',
    }
  ]

  redirectToDoctorPage(router: string[]): void {
    this.router.navigate(router).then();
  }
}
