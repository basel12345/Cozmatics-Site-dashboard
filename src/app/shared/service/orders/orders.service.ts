import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpService: HttpService) { }
  items: any;

  getAllOrdersWithFilters(Filters: any, pageNo?: number, pageSize?: number) {
    return this.httpService.post(`Order/GetAllWithFilters?pageNo=${pageNo}&pageSize=${pageSize}`, Filters);
  }

  getOrderById(id: number) {
    return this.httpService.get(`Order/GetOrderById?id=${id}`);
  }


  changeStatus(status: number, id: number) {
    return this.httpService.put(`Order/UpdateOrderStatus`, {
      id: id,
      status: status
    })
  }
}
