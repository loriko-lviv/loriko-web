import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ServiceTypeWithId } from '../../../../../../data/services-catalog';

@Component({
  selector: 'app-admin-price-editor',
  templateUrl: './price-editor.component.html',
  styleUrls: ['./price-editor.component.scss'],
})
export class AdminPriceEditorComponent {
  @Input() services: ServiceTypeWithId[] = [];
  @Input() activeTab = 0;
  @Input() loading = false;
  @Input() saving = false;
  @Input() totalChanges = 0;
  @Input() hasChanges = false;

  @Output() activeTabChange = new EventEmitter<number>();
  @Output() openAdd = new EventEmitter<void>();
  @Output() openReview = new EventEmitter<void>();
  @Output() removeTopLevel = new EventEmitter<{ serviceIndex: number; itemIndex: number }>();
  @Output() removeChild = new EventEmitter<{ serviceIndex: number; parentIndex: number; childIndex: number }>();

  get tabNames(): string[] {
    return this.services.map((s) => s.type);
  }

  get activeService(): ServiceTypeWithId | null {
    return this.services[this.activeTab] ?? null;
  }
}
