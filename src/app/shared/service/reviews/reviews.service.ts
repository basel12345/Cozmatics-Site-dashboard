import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private httpService: HttpService) { }

  getRewiewsByProductid(id: number) {
		return this.httpService.get(`Review/GetByProductId?productId=${id}`)
	}

  deleteReview(id: number) {
		return this.httpService.delete("Review/Delete", id);
	}
}
