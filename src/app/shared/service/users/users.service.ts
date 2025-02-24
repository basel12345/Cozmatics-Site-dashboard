import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private httpService: HttpService) { }

  getAllUsers(pageNo?: number, pageSize?: number) {
    return this.httpService.get(`Customer/GetAll?pageNo=${pageNo}&pageSize=${pageSize}`)
  }

  getUserById(id: number) {
    return this.httpService.get(`Customer/GetById?id=${id}`)
  }

  getAllWithFilters(pageNo: number, pageSize: number, Filters: any): Observable<any> {
    return this.httpService.post(`Customer/GetAllWithFilters?pageNo=${pageNo}&pageSize=${pageSize}`, Filters)
  }

  addressByCustNo(id: number) {
    return this.httpService.get(`Location/AddressByCustNo?customerId=${id}`)
  }

  gettUsersCount() {
    return this.httpService.get(`Customer/GetCustomerCount`)
  }
}
