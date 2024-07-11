import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
	providedIn: 'root'
})
export class CategoriesService {

	constructor(private httpService: HttpService) { }

	getAllCategories(pageNo?: number, pageSize?: number) {
		return this.httpService.get(`Category/GetAll?pageNo=${pageNo}&pageSize=${pageSize}`)
	}

	getCategoryByid(id: number) {
		return this.httpService.get(`Category/GetById?id=${id}`)
	}

	deleteCategory(id: number) {
		return this.httpService.delete("Category/Delete", id);
	}

	editCategory(data: any) {
		return this.httpService.put("Category/Update", data);
	}

	addCategory(data: any) {
		return this.httpService.post("Category/Add", data);
	}

	uploadFile(id: number, data: any) {
		return this.httpService.post(`gallery/uploadCategoryImg/${id}`, data);
	}
}
