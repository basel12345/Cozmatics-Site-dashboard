import { Component, OnInit } from '@angular/core';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BrandsService } from '../../shared/service/brands/brands.service';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { OrdersService } from '../../shared/service/orders/orders.service';
import { FilterMatchMode, SelectItem } from 'primeng/api';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule, CheckboxModule, FormsModule, PaginatorModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  orders: any;
  first: number = 1;
  totalCount!: number;
  page: number = 1;
  loading: boolean = false;
  matchModeOptions: SelectItem[];
  statusOptions = [
    { label: 'Open', value: 0 },
    { label: 'Confirmed', value: 1 },
    { label: 'Canceled', value: 2 },
    { label: 'Delivered', value: 3 },
    { label: 'Closed', value: 4 }
];

deliveryTypeOptions = [
    { label: 'Home', value: 0 },
    { label: 'Shop', value: 1 }
];
  Filters: any;
  constructor(
    private ordersService: OrdersService,
    private router: Router
  ) { 
    this.matchModeOptions = [
      { 
          label: 'Starts With', 
          value: FilterMatchMode.STARTS_WITH 
      },
      { 
          label: 'Contains', 
          value: FilterMatchMode.CONTAINS 
      },
      {     
          label: 'Equals', 
          value: FilterMatchMode.EQUALS
      },
];
  }


  loadOrdersLazy(event: TableLazyLoadEvent) {
    this.getAllordersWithFilters(event.filters);
  }

  getAllordersWithFilters(filters:any) {
    this.Filters = filters;
    this.loading = true;
    this.ordersService
      .getAllOrdersWithFilters(filters,this.page, 10)
      .subscribe((response: any) => {
        this.orders = response.orders;
        this.totalCount = response.count;
        this.loading = false;
      });
  }

  navigateToAddBrand() {
    this.router.navigate(["brand"]);
  }

  onPageChange(event: PaginatorState) {
    if (event.page || event.page === 0) this.page = event.page + 1;
    if (event.first || event.first === 0) this.first = event.first + 1;
    this.getAllordersWithFilters(this.Filters);
  }

  navigateToProduct(items: any) {
    localStorage.setItem("items", JSON.stringify(items));
    this.ordersService.items = items;
    this.router.navigate(['order-products']);
  }

  changeStatus(status: number, id: number) {
    this.ordersService.changeStatus(status, id).subscribe(res => {
      this.getAllordersWithFilters(this.Filters);
    })
  }
}
