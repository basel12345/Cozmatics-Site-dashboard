import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class HttpService {
	api: string = 'https://api-endpoint.abaqelanayah.com/api/';//'http://localhost:5237/api/';
	constructor(private httpClient: HttpClient) { }

	get(url: string) {
		return this.httpClient.get<any>(`${this.api}${url}`);
	}

	post(url: string, data: any) {
		return this.httpClient.post(`${this.api}${url}`, data);
	}

	put(url: string, data: any) {
		return this.httpClient.put(`${this.api}${url}`, data);
	}

	delete(url: string, id: number) {
		return this.httpClient.delete(`${this.api}${url}?Id=${id}`);
	}

	deleteByParams(url: string, id: number) {
		return this.httpClient.delete(`${this.api}${url}/${id}`);
	}
}
