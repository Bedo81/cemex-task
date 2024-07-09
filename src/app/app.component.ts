import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderHeaderComponent } from './order-header/order-header.component';
import { OrderListComponent } from './order-list/order-list.component';

interface Order {
  status: string;
  orderNumber: string;
  productLine: string;
  product: string;
  quantity: string;
  dateRequested: Date;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, OrderHeaderComponent, OrderListComponent]
})
export class AppComponent {
  orders: Order[] = [
    { status: 'In Progress', orderNumber: '3301', productLine: 'Ready-Mix', product: '1-200-2-C28-121-3-000', quantity: '12 m3', dateRequested: new Date('2022-12-20') },
    { status: 'Pending', orderNumber: '3302', productLine: 'Cement', product: '1-220-2-C28-121-3-000', quantity: '10 TN', dateRequested: new Date('2022-10-10') },
    { status: 'Completed', orderNumber: '3290', productLine: 'Ready-Mix', product: '1-299-2-C28-121-3-000', quantity: '2 m3', dateRequested: new Date('2022-09-29') },
    { status: 'In Progress', orderNumber: '3184', productLine: 'Cement', product: '1-210-2-C28-121-3-000', quantity: '5 TN', dateRequested: new Date('2022-09-23') },
    { status: 'Pending', orderNumber: '3295', productLine: 'Aggregates', product: '1-250-2-C28-121-3-000', quantity: '7 TN', dateRequested: new Date('2022-08-24') },
    { status: 'Completed', orderNumber: '3284', productLine: 'Cement', product: '1-250-2-C28-121-3-000', quantity: '8 TN', dateRequested: new Date('2022-07-25') },
    { status: 'In Progress', orderNumber: '3095', productLine: 'Aggregates', product: '1-250-2-C28-121-3-000', quantity: '20 TN', dateRequested: new Date('2022-04-26') },
    { status: 'Pending', orderNumber: '2944', productLine: 'Ready-Mix', product: '1-250-2-C28-121-3-000', quantity: '18 m3', dateRequested: new Date('2021-12-27') },
  ];

  filteredOrders: Order[] = [...this.orders];

  selectedStatuses: string[] = [];
  selectedProductLine = 'All';
  fromDate: Date | null = null;
  toDate: Date | null = null;
  searchTerm = '';

  onFilterChange(filters: any) {
    this.selectedStatuses = filters.selectedStatuses;
    this.selectedProductLine = filters.selectedProductLine;
    this.fromDate = filters.fromDate;
    this.toDate = filters.toDate;
    this.filterOrders();
  }

  onSearch(term: string) {
    this.searchTerm = term;
    this.filterOrders();
  }

  filterOrders() {
    this.filteredOrders = this.orders.filter(order => {
      const matchesStatus = this.selectedStatuses.length === 0 || this.selectedStatuses.includes(order.status);
      const matchesProductLine = this.selectedProductLine === 'All' || order.productLine === this.selectedProductLine;
      const matchesDateRange = (!this.fromDate || order.dateRequested >= this.fromDate) && (!this.toDate || order.dateRequested <= this.toDate);
      const matchesSearchTerm = !this.searchTerm || order.orderNumber.includes(this.searchTerm);

      return matchesStatus && matchesProductLine && matchesDateRange && matchesSearchTerm;
    });
  }
}
