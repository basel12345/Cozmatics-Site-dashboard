import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TableModule } from 'primeng/table';
import { OrdersService } from '../../../shared/service/orders/orders.service';
import { LoadingService } from '../../../shared/service/loading/loading.service';

@Component({
  selector: 'app-order-products',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './order-products.component.html',
  styleUrl: './order-products.component.css'
})
export class OrderProductsComponent {
  items: any;

  constructor(
		public sanitizer: DomSanitizer,
    public ordersService: OrdersService,
    private loadingSerive: LoadingService
	) { 
    const items = localStorage.getItem("items")
    if(items) this.items = JSON.parse(items);
    this.loadingSerive.hideLoading();
  }

  sanitizationImage(image: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl("data:image/png;base64," + image);
  }
}
