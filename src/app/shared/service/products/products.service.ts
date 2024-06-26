import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
	providedIn: 'root'
})
export class ProductsService {

	constructor(private httpService: HttpService) { }

	getAllProducts(pageNo: number, pageSize: number) {
		return this.httpService.get(`Product/GetAll?pageNo=${pageNo}&pageSize=${pageSize}`);
	}

	getProductByid(id: number) {
		return this.httpService.get(`Product/GetById?id=${id}`)
	}

	getProductDetails(id: number) {
		return this.httpService.get(`Product/GetProductDetails?id=${id}`)
	}

	deleteProduct(id: number) {
		return this.httpService.delete("Product/Delete", id);
	}

	deleteImageProduct(id: number) {
		return this.httpService.deleteByParams("gallery/DeleteProductImg", id);
	}

	editProduct(data: any) {
		return this.httpService.put("Product/Update", data);
	}

	addProduct(data: any) {
		return this.httpService.post("Product/Add", data);
	}

	getAllBrands() {
		return this.httpService.get("Brand/GetAll");
	}

	uploadFile(id: number, isCover: number, data: any) {
		return this.httpService.post(`gallery/uploadProductImg/${id}/${isCover }`, data);
	}
}
