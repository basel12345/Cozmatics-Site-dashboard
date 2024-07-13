import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
	providedIn: 'root'
})
export class BrandsService {

	constructor(private httpService: HttpService) { }

	getAllBrands(pageNo?: number, pageSize?: number) {
		return this.httpService.get(`Brand/GetAll?pageNo=${pageNo}&pageSize=${pageSize}`)
	}

	getAllWithPaging(pageNo?: number, pageSize?: number) {
		return this.httpService.get(`Brand/GetAllWithPaging?pageNo=${pageNo}&pageSize=${pageSize}`)
	}

	getBrandByid(id: number) {
		return this.httpService.get(`Brand/GetById?id=${id}`)
	}

	deleteBrand(id: number) {
		return this.httpService.delete("Brand/Delete", id);
	}

	editBrand(data: any) {
		return this.httpService.put("Brand/Update", data);
	}

	addBrand(data: any) {
		return this.httpService.post("Brand/Add", data);
	}

	uploadFile(id: number, data: any) {
		return this.httpService.post(`Brand/UploadImg/${id}`, data);
	}
}
