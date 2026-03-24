import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ServiceTypeWithId } from '../../../../../../data/services-catalog';

@Component({
  selector: 'app-admin-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss'],
})
export class AdminAddDialogComponent implements OnChanges {
  @Input() services: ServiceTypeWithId[] = [];
  @Input() initialGroupIndex = 0;

  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<{
    groupIndex: number;
    parentId: string | null;
    title: string;
    price: string;
  }>();

  groupIndex = 0;
  parentId: string | null = null;
  title = '';
  price = '';
  submitted = false;

  get tabNames(): string[] {
    return this.services.map((s) => s.type);
  }

  get parentOptions(): Array<{ id: string; title: string }> {
    return (this.services[this.groupIndex]?.list ?? [])
      .filter((item) => item.list && item.list.length > 0)
      .map((item) => ({ id: item.id, title: item.title }));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialGroupIndex']) {
      this.groupIndex = this.initialGroupIndex;
      this.parentId = null;
    }
  }

  setGroup(i: number) {
    this.groupIndex = i;
    this.parentId = null;
  }

  onConfirm() {
    this.submitted = true;
    if (!this.title.trim() || !this.price.trim()) return;
    this.confirm.emit({
      groupIndex: this.groupIndex,
      parentId: this.parentId,
      title: this.title.trim(),
      price: this.price.trim(),
    });
  }
}
