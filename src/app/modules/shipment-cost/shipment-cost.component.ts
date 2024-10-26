import { Component, OnInit } from '@angular/core';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { ShipmentCostService } from '../../shared/service/shipment-cost/shipment-cost.service';
import { FilterMatchMode, FilterMetadata, SelectItem } from 'primeng/api';

@Component({
  selector: 'app-shipment-cost',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule, CheckboxModule, FormsModule, PaginatorModule],
  templateUrl: './shipment-cost.component.html',
  styleUrl: './shipment-cost.component.css'
})
export class ShipmentCostComponent {
  shipmentCost: any;
  first: number = 1;
  totalCount!: number;
  page: number = 1;
  Filters: { [s: string]: FilterMetadata | FilterMetadata[] | undefined; } | undefined;
  loading: boolean = false;
  matchModeOptions!: SelectItem[];
  constructor(
    private shipmentCostService: ShipmentCostService,
    private toastr: ToastrService,
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
    this.Filters = event.filters;
    this.getShipmentCostWithFilters();
  }


  getShipmentCostCount() {
    this.shipmentCostService.getShipmentCostCount().subscribe(res => {
      this.totalCount = res;
    });
  }

  getShipmentCostWithFilters() {
    this.shipmentCostService.getShipmentCostWithFilters(this.page, 10, this.Filters).subscribe(res => {
      this.getShipmentCostCount();
      this.shipmentCost = res;
    });
  }

  navigateToAddBrand() {
    this.router.navigate(["brand"]);
  }

  onPageChange(event: PaginatorState) {
    if (event.page || event.page === 0) this.page = event.page + 1;
    if (event.first || event.first === 0) this.first = event.first + 1;
    this.getShipmentCostWithFilters();
  }

  navigateToEditShipmentCost(id: any) {
    this.router.navigate([`edit-shipment-cost/${id}`]);
  }

  deleteShipmentCost(id: number) {
    this.shipmentCostService.delteShipmentCost(id).subscribe(res => {
      this.toastr.success('Shipment Cost is Deleted', 'Success');
      this.getShipmentCostWithFilters();
    })
  }

  navigateToAddShipmentCost() {
    this.router.navigate([`add-shipment-cost`]);
  }
}
