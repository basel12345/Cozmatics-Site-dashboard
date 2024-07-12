import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpService: HttpService) { }
  items: any;

  getAllOrders(pageNo?: number, pageSize?: number) {
		return this.httpService.get(`Order/GetAll?pageNo=${pageNo}&pageSize=${pageSize}`)
	}


  gettSalesOrderCount() {
		return this.httpService.get(`Order/GetSalesOrderCount`)
  }
}
