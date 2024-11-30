import { NgFor, NgIf } from '@angular/common';
import { OrdersService } from './../../../shared/service/orders/orders.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-order-details',
	standalone: true,
	imports: [NgIf, NgFor],
	templateUrl: './order-details.component.html',
	styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent implements OnInit {
	order: any;
	constructor(
		private route: ActivatedRoute,
		private orderService: OrdersService
	) {

	}
	ngOnInit(): void {
		this.route.params.subscribe(res => {
			this.getOrderById(res['id']);
		})
	}

	getOrderById(id: number) {
		this.orderService.getOrderById(id).subscribe(res => {
			console.log(res);
			this.order = res;
		})
	}
}
