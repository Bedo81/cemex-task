import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class OrderListComponent {
  @Input() orders: any[] = [];

  statusClass(status: string): string {
    return status.toLowerCase().replace(' ', '-');
  }
}
