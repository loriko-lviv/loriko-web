import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.scss'],
})
export class AdminReviewDialogComponent {
  @Input() review: {
    modified: { title: string; oldPrice: string; newPrice: string }[];
    removed: { title: string }[];
    added: { title: string; price: string; groupName: string; parentTitle?: string }[];
  } = { modified: [], removed: [], added: [] };

  @Input() hasChanges = false;
  @Input() totalChanges = 0;

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();
}
