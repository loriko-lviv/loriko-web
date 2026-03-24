import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class AdminDeleteDialogComponent {
  @Input() target!: { label: string; childCount: number };

  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();
}
