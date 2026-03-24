import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ContactFormDialogComponent } from '../../../../../../shared/dialogs/contact-form-dialog/contact-form-dialog.component';

interface Employee {
  firstname: string;
  lastname: string;
  role: string;
  specialty: string;
  sinceYear: number;
  route: string[];
  imageUrl: string;
}

@Component({
  selector: 'app-our-employees',
  templateUrl: './our-employees.component.html',
  styleUrls: ['./our-employees.component.scss'],
})
export class OurEmployeesComponent {
  constructor(private router: Router, private dialog: MatDialog) {}

  readonly employees: Employee[] = [
    {
      firstname: 'Богдан Мирославович',
      lastname: 'Раба',
      role: 'Лікар-отоларинголог',
      specialty: 'ЛОР',
      sinceYear: 2008,
      route: ['/doctors', 'raba-bohdan'],
      imageUrl: '/assets/l-kar-otorinolaringolog-back.webp',
    },
    {
      firstname: 'Галина Іванівна',
      lastname: 'Раба',
      role: 'Лікар-косметолог',
      specialty: 'Косметологія',
      sinceYear: 2008,
      route: ['/doctors', 'raba-galia'],
      imageUrl: '/assets/l-kar-kosmetolog.webp',
    },
    {
      firstname: 'Христина Вікторівна',
      lastname: 'Коротіна',
      role: 'Лікар-отоларинголог',
      specialty: 'ЛОР',
      sinceYear: 2022,
      route: ['/doctors', 'korotina-khristina'],
      imageUrl: '/assets/korotina_kh.webp',
    },
  ];

  experience(sinceYear: number): number {
    return new Date().getFullYear() - sinceYear;
  }

  yearsLabel(sinceYear: number): string {
    const n = this.experience(sinceYear);
    const titles = ['рік', 'роки', 'років'];
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[n % 100 > 4 && n % 100 < 20 ? 2 : cases[Math.min(n % 10, 5)]];
  }

  goToDoctor(route: string[]): void {
    this.router.navigate(route);
  }

  openContactDialog(): void {
    this.dialog.open(ContactFormDialogComponent, {
      panelClass: 'contact-form-dialog',
    });
  }
}
