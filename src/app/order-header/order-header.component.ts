import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-order-header',
  templateUrl: './order-header.component.html',
  styleUrls: ['./order-header.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, NzCheckboxModule, NzSelectModule, NzDatePickerModule, NzInputModule, NzIconModule]
})
export class OrderHeaderComponent {
  selectedStatuses: string[] = [];
  selectedProductLine = 'All';
  fromDate: Date | null = null;
  toDate: Date | null = null;
  searchTerm = '';

  @Output() filterChange = new EventEmitter<any>();
  @Output() search = new EventEmitter<string>();

  onFilterChange() {
    this.filterChange.emit({
      selectedStatuses: this.selectedStatuses,
      selectedProductLine: this.selectedProductLine,
      fromDate: this.fromDate,
      toDate: this.toDate,
    });
  }

  onSearch() {
    this.search.emit(this.searchTerm);
  }

  onFromDateChange(date: Date | null) {
    if (date) {
      date.setHours(0, 0, 0, 0);
    }
    this.fromDate = date;
    this.onFilterChange();
  }

  onToDateChange(date: Date | null) {
    if (date) {
      date.setHours(23, 59, 59, 999);
    }
    this.toDate = date;
    this.onFilterChange();
  }
}
