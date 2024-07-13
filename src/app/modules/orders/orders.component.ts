import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BrandsService } from '../../shared/service/brands/brands.service';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { OrdersService } from '../../shared/service/orders/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule, CheckboxModule, FormsModule, PaginatorModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  orders: any;
  first: number = 0;
  totalCount!: number;
  page: number = 0;
  constructor(
    private ordersService: OrdersService,
    public sanitizer: DomSanitizer,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllorders();
  }

  gettSalesOrderCount() {
    this.ordersService.gettSalesOrderCount().subscribe(res => {
      this.totalCount = res;
    });
  }

  getAllorders() {
    this.ordersService.getAllOrders(this.page, 10).subscribe(res => {
      this.orders = res;
      this.gettSalesOrderCount();
    });
  }
  sanitizationImage(image: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl("data:image/png;base64," + image);
  }

  navigateToAddBrand() {
    this.router.navigate(["brand"]);
  }

  onPageChange(event: PaginatorState) {
    if (event.page || event.page === 0) this.page = event.page;
    if (event.first || event.first === 0) this.first = event.first;
    this.getAllorders();
  }

  navigateToProduct(items: any) {
    localStorage.setItem("items", JSON.stringify(items));
    this.ordersService.items = items;
    this.router.navigate(['order-products']);
  }
}
