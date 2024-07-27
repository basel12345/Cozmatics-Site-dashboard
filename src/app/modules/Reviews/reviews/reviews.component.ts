import { Component } from '@angular/core';
import { ReviewsService } from '../../../shared/service/reviews/reviews.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {

  reviews: any;
  id!: number;
  constructor(
    private reviewService: ReviewsService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(res => {
      this.id = res["id"];
      if (this.id)
        this.getAllReviews();
    });
  }

  getAllReviews() {
    this.reviewService.getRewiewsByProductid(this.id).subscribe(res => {
      this.reviews = res;
    });
  }

  deleteReview(id: number) {
    this.reviewService.deleteReview(id).subscribe(res => {
      this.toastr.success('review is Deleted', 'Success');
      this.getAllReviews();
    })
  }
}
