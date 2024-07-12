import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { ShipmentCostService } from '../../shared/service/shipment-cost/shipment-cost.service';

@Component({
  selector: 'app-shipment-cost',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule, CheckboxModule, FormsModule, PaginatorModule],
  templateUrl: './shipment-cost.component.html',
  styleUrl: './shipment-cost.component.css'
})
export class ShipmentCostComponent implements OnInit {
  shipmentCost: any;
  first: number = 1;
  totalCount!: number;
  page: number = 1;
  constructor(
    private shipmentCostService: ShipmentCostService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getShipmentCost();
  }

  getShipmentCost() {
    this.shipmentCostService.getShipmentCost(this.page, 10).subscribe(res => {
      this.shipmentCost = res;
    });
  }

  navigateToAddBrand() {
    this.router.navigate(["brand"]);
  }

  onPageChange(event: PaginatorState) {
    if (event.page || event.page === 0) this.page = event.page + 1;
    if (event.first || event.first === 0) this.first = event.first + 1;
    this.getShipmentCost();
  }

  navigateToEditShipmentCost(id: any) {
    this.router.navigate([`edit-shipment-cost/${id}`]);
  }

  deleteShipmentCost(id: number) {
		this.shipmentCostService.delteShipmentCost(id).subscribe(res => {
			this.toastr.success('Shipment Cost is Deleted', 'Success');
			this.getShipmentCost();
			this.shipmentCost = this.shipmentCost.filter((res: any) => res.id !== id);
		})
	}

  navigateToAddShipmentCost() {
    this.router.navigate([`add-shipment-cost`]);
  }
}