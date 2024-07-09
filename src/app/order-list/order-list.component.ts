import { Component, Input, HostListener } from '@angular/core';
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
  isSmallScreen: boolean = window.innerWidth < 576;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isSmallScreen = window.innerWidth < 576;
  }

  statusClass(status: string): string {
    return status.toLowerCase().replace(' ', '-');
  }
}
