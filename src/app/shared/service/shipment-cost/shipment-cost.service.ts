import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShipmentCostService {

  constructor(private httpService: HttpService) { }

  getShipmentCost(pageNo: number, pageSize: number) {
    return this.httpService.get(`ShipmentCost/GetShipmentCost?pageNo=${pageNo}&pageSize=${pageSize}`);
  }

  getShipmentCostWithFilters(pageNo: number, pageSize: number, Filters: any): Observable<any> {
    return this.httpService.post(`ShipmentCost/GetShipmentCostWithFilters?pageNo=${pageNo}&pageSize=${pageSize}`, Filters);
  }

  getShipmentCostCount() {
    return this.httpService.get(`ShipmentCost/GetShipmentCostCount`);
  }

  delteShipmentCost(id: number) {
    return this.httpService.deleteByParams(`ShipmentCost/delete`, id);
  }

  getShipmentCostById() {
    return this.httpService.get(`ShipmentCost/GetShipmentLocations`);
  }
  addShipmentCost(data: any) {
    return this.httpService.post(`ShipmentCost/GetShipmentCost`, data);
  }

  editShipmentCost(data: any) {
    return this.httpService.put(`ShipmentCost/SetShipmentCost${data.id}/${data.cost}`, {});
  }
}
