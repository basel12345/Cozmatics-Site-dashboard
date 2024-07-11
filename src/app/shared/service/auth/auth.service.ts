import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(private http: HttpClient) { }

	register(user: any): Observable<any> {
		return this.http.post<any>(`http://abaq2023-001-site1.htempurl.com/api/Account/register`, user)
	}

	login(user: any): Observable<any> {
		return this.http.post<any>(`http://abaq2023-001-site1.htempurl.com/api/Account/Login`, user)
	}
}
