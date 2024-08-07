import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AddBrandsComponent } from './add-brands/add-brands.component';
import { BrandsService } from '../../shared/service/brands/brands.service';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
	selector: 'app-brands',
	standalone: true,
	imports: [TableModule, CommonModule, ButtonModule, CheckboxModule, FormsModule, AddBrandsComponent, PaginatorModule],
	templateUrl: './brands.component.html',
	styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit {
	brands: any;
	first: number =1;
	totalCount!: number;
	page: number = 1;
	constructor(
		private brandsService: BrandsService,
		public sanitizer: DomSanitizer,
		private toastr: ToastrService,
		private router: Router
	) { }

	ngOnInit(): void {
		this.getAllbrands();
	}

	getAllbrands() {
		this.brandsService.getAllWithPaging(this.page, 10).subscribe(res => {
			this.brands = res['brands'];
			this.totalCount = res['totalCount'];
		});
	}
	sanitizationImage(image: string): SafeResourceUrl {
		return this.sanitizer.bypassSecurityTrustResourceUrl("data:image/png;base64," + image);
	}

	deleteBrand(id: number) {
		this.brandsService.deleteBrand(id).subscribe(res => {
			this.toastr.success('Brand is Deleted', 'Success');
			this.getAllbrands();
		}, err => {
			this.toastr.error(err?.error?.msg);
		})
	}

	navigateToAddBrand() {
		this.router.navigate(["brand"]);
	}

	navigateToEditBrand(id: number) {
		this.router.navigate([`brand/${id}`]);
	}

	changePhoto(id: number) {
		this.router.navigate([`image-brand/${id}`])
	}

	onPageChange(event: PaginatorState) {
		if (event.page || event.page === 0) this.page = event.page + 1;
		if (event.first || event.first === 0) this.first = event.first + 1;
		this.getAllbrands();
	}
}
