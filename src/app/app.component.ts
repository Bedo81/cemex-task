import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderHeaderComponent } from './order-header/order-header.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderService } from './order.service';
import { WindowRef } from './window.service';
import { NzIconModule } from 'ng-zorro-antd/icon';

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
  imports: [CommonModule, OrderHeaderComponent, OrderListComponent, NzIconModule],
})
export class AppComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];

  selectedStatuses: string[] = [];
  selectedProductLine = 'All';
  fromDate: Date | null = null;
  toDate: Date | null = null;
  searchTerm = '';

  constructor(private orderService: OrderService, @Inject(WindowRef) private windowRef: WindowRef) {}

  ngOnInit() {
    this.orders = this.orderService.getOrders();
    this.filteredOrders = [...this.orders];
    this.setupWindowResizeListener();
  }

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
    this.filteredOrders = this.orderService.filterOrders({
      selectedStatuses: this.selectedStatuses,
      selectedProductLine: this.selectedProductLine,
      fromDate: this.fromDate,
      toDate: this.toDate,
      searchTerm: this.searchTerm,
    });
  }

  private setupWindowResizeListener() {
    this.windowRef.nativeWindow.addEventListener('resize', this.onResize.bind(this));
  }

  private onResize(event: any) {
    console.log('Window resized:', event.target.innerWidth);
    // Handle window resize event
  }
}
