import { Injectable, OnDestroy } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
	providedIn: 'root'
})
export class ProductsService {
	page: number = 1;
	first: number = 1;

	constructor(private httpService: HttpService) { }


	getAllProductsWithFilters(pageNo: number, pageSize: number,Filters:any) {
		return this.httpService.post(`Product/GetAllWithFilters?pageNo=${pageNo}&pageSize=${pageSize}`,Filters);
	}

	getProductByid(id: number) {
		return this.httpService.get(`Product/GetById?id=${id}`)
	}

	getProductDetails(id: number) {
		return this.httpService.get(`Product/GetProductDetails?id=${id}`)
	}

	uploadExcel(data: any) {
		return this.httpService.post("Product/UploadExcel", data);
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

	deleteBarCode(id: number) {
		return this.httpService.delete(`barcodes/Delete/`, id);
	}

	addBarCode(data: any) {
		return this.httpService.post(`barcodes/Add`, data);
	}
}
