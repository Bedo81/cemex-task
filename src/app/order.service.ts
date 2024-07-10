import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orders = [
    { status: 'In Progress', orderNumber: '3301', productLine: 'Ready-Mix', product: '1-200-2-C28-121-3-000', quantity: '12 m3', dateRequested: new Date('2022-12-20') },
    { status: 'Pending', orderNumber: '3302', productLine: 'Cement', product: '1-220-2-C28-121-3-000', quantity: '10 TN', dateRequested: new Date('2022-10-10') },
    { status: 'Completed', orderNumber: '3290', productLine: 'Ready-Mix', product: '1-299-2-C28-121-3-000', quantity: '2 m3', dateRequested: new Date('2022-09-29') },
    { status: 'In Progress', orderNumber: '3184', productLine: 'Cement', product: '1-210-2-C28-121-3-000', quantity: '5 TN', dateRequested: new Date('2022-09-23') },
    { status: 'Pending', orderNumber: '3295', productLine: 'Aggregates', product: '1-250-2-C28-121-3-000', quantity: '7 TN', dateRequested: new Date('2022-08-24') },
    { status: 'Completed', orderNumber: '3284', productLine: 'Cement', product: '1-250-2-C28-121-3-000', quantity: '8 TN', dateRequested: new Date('2022-07-25') },
    { status: 'In Progress', orderNumber: '3095', productLine: 'Aggregates', product: '1-250-2-C28-121-3-000', quantity: '20 TN', dateRequested: new Date('2022-04-26') },
    { status: 'Pending', orderNumber: '2944', productLine: 'Ready-Mix', product: '1-250-2-C28-121-3-000', quantity: '18 m3', dateRequested: new Date('2021-12-27') },
  ];

  getOrders() {
    return this.orders;
  }

  filterOrders(filters: any) {
    const { selectedStatuses, selectedProductLine, fromDate, toDate, searchTerm } = filters;

    return this.orders.filter((order) => {
      const matchesStatus =
        !selectedStatuses.length || selectedStatuses.includes(order.status);
      const matchesProductLine =
        selectedProductLine === 'All' || order.productLine === selectedProductLine;
      const matchesFromDate =
        !fromDate || new Date(order.dateRequested) >= new Date(fromDate);
      const matchesToDate =
        !toDate || new Date(order.dateRequested) <= new Date(toDate);
      const matchesSearchTerm =
        !searchTerm ||
        order.orderNumber.toString().includes(searchTerm);

      return (
        matchesStatus &&
        matchesProductLine &&
        matchesFromDate &&
        matchesToDate &&
        matchesSearchTerm
      );
    });
  }
}
