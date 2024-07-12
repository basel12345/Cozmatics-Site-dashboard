import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http/http.service';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(private httpService: HttpService) { }

	register(user: any): Observable<any> {
		return this.httpService.post(`Account/register`, user)
	}

	login(user: any): Observable<any> {
		return this.httpService.post(`Account/Login`, user)
	}
}
