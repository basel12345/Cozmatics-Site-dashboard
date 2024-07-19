import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CategoriesService } from '../../shared/service/categories/categories.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AddCategoriesComponent } from './add-categories/add-categories.component';
import { Router } from '@angular/router';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
	selector: 'app-categories',
	standalone: true,
	imports: [TableModule, CommonModule, ButtonModule, CheckboxModule, FormsModule, AddCategoriesComponent, PaginatorModule],
	templateUrl: './categories.component.html',
	styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
	categories: any;
	first: number = 1;
	totalCount!: number;
	page: number = 1;
	constructor(
		private categoriesService: CategoriesService,
		public sanitizer: DomSanitizer,
		private toastr: ToastrService,
		private router: Router
	) { }

	ngOnInit(): void {
		this.getAllCategories();
	}

	getAllCategories() {
		this.categoriesService.getAllWithPaging(this.page, 5).subscribe(res => {
			this.categories = res?.['categories'];
			this.totalCount = res?.['totalCount'];
		});
	}

	sanitizationImage(image: string): SafeResourceUrl {
		return this.sanitizer.bypassSecurityTrustResourceUrl("data:image/png;base64," + image);
	}

	deleteCategory(id: number) {
		this.categoriesService.deleteCategory(id).subscribe(res => {
			this.toastr.success('Category is Deleted', 'Success');
			this.getAllCategories();
			this.categories = this.categories.filter((res: any) => res.id !== id);
		}, err => {
			this.toastr.error(err?.error?.msg);
		})
	}

	navigateToAddCategory() {
		this.router.navigate(["category"]);
	}

	navigateToEditCategory(id: number) {
		this.router.navigate([`category/${id}`]);
	}

	changePhoto(id: number) {
		this.router.navigate([`image-category/${id}`])
	}

	onPageChange(event: PaginatorState) {
		if (event.page || event.page === 0) this.page = event.page + 1;
		if (event.first || event.first === 0) this.first = event.first + 1;
		this.getAllCategories();
	}
}
