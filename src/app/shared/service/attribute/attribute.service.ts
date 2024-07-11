import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  constructor(private httpService: HttpService) { }

	getAttrValueByProductid(id: number) {
		return this.httpService.get(`AttributeValue/GetAttributeValuesByProductId?ProductId=${id}`)
	}
  getAttrValueById(id:number) {
		return  this.httpService.get(`AttributeValue/GetAttributeValuesById?AttrId=${id}`)
	}
	deleteAttrValue(id: number) {
		return this.httpService.delete("AttributeValue", id);
	}

	editAttrValue(data: any) {
		return this.httpService.put("AttributeValue", data);
	}

	addAttrValue(data: any) {
		return this.httpService.post("AttributeValue", data);
	}
}
