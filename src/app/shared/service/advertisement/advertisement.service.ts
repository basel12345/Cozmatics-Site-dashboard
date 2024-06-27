import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
	providedIn: 'root'
})
export class AdvertisementsService {

	constructor(private httpService: HttpService) { }

	getAllAdvertisements() {
		return this.httpService.get("Advertisement/GetAll")
	}

	getAdvertisementByid(id: number) {
		return this.httpService.get(`Advertisement/GetById?id=${id}`)
	}

	deleteAdvertisement(id: number) {
		return this.httpService.delete("Advertisement/Delete", id);
	}

	editAdvertisement(data: any) {
		return this.httpService.put("Advertisement/Update", data);
	}

	addAdvertisement(data: any) {
		return this.httpService.post("Advertisement/Add", data);
	}
}
