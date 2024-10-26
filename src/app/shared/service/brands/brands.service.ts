import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';

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

	getAllBrandsWithFilters(pageNo: number, pageSize: number, Filters: any): Observable<any> {
		return this.httpService.post(`Brand/GetAllWithPagingAndFilters?pageNo=${pageNo}&pageSize=${pageSize}`, Filters)
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
