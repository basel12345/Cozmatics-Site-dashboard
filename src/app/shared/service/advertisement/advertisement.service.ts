import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
	providedIn: 'root'
})
export class AdvertisementsService {

	constructor(private httpService: HttpService) { }

	getAllAdvertisements(pageNo?: number, pageSize?: number) {
		const uniqueParam = `cahceBuster=${new Date().getTime()}`;
		const cacheBusterUrl = `Advertisement/GetAll?pageNo=${pageNo}&pageSize=${pageSize}&${uniqueParam}`
		return this.httpService.get(`${cacheBusterUrl}`)
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

	uploadFile(id: number, data: any) {
		return this.httpService.post(`Advertisement/UploadImg/${id}`, data);
	}
}
