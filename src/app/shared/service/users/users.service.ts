import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private httpService: HttpService) { }

  getAllUsers(pageNo?: number, pageSize?: number) {
		return this.httpService.get(`Customer/GetAll?pageNo=${pageNo}&pageSize=${pageSize}`)
	}


  gettUsersCount() {
		return this.httpService.get(`Customer/GetCustomerCount`)
  }
}
