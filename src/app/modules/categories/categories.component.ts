import { Component } from '@angular/core';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { CategoriesService } from '../../shared/service/categories/categories.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AddCategoriesComponent } from './add-categories/add-categories.component';
import { Router } from '@angular/router';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { FilterMatchMode, FilterMetadata, SelectItem } from 'primeng/api';

@Component({
	selector: 'app-categories',
	standalone: true,
	imports: [TableModule, CommonModule, ButtonModule, CheckboxModule, FormsModule, AddCategoriesComponent, PaginatorModule],
	templateUrl: './categories.component.html',
	styleUrl: './categories.component.css'
})
export class CategoriesComponent {
	categories: any;
	first: number = 1;
	totalCount!: number;
	page: number = 1;
	Filters: { [s: string]: FilterMetadata | FilterMetadata[] | undefined; } | undefined;
	loading: boolean = false;
	matchModeOptions!: SelectItem[];

	constructor(
		private categoriesService: CategoriesService,
		private toastr: ToastrService,
		private router: Router
	) { 
		this.matchModeOptions = [
			{
				label: 'Starts With',
				value: FilterMatchMode.STARTS_WITH
			},
			{
				label: 'Contains',
				value: FilterMatchMode.CONTAINS
			},
			{
				label: 'Equals',
				value: FilterMatchMode.EQUALS
			},
		];
	}

	loadOrdersLazy(event: TableLazyLoadEvent) {
		this.Filters = event.filters;
		this.getAllCategoriesWithFilters();
	}

	getAllCategoriesWithFilters() {
		this.categoriesService.getAllCategoriesWithFilters(this.page, 5, this.Filters).subscribe(res => {
			this.categories = res?.['categories'];
			this.totalCount = res?.['totalCount'];
		});
	}

	deleteCategory(id: number) {
		this.categoriesService.deleteCategory(id).subscribe(res => {
			this.toastr.success('Category is Deleted', 'Success');
			this.getAllCategoriesWithFilters();
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
		this.getAllCategoriesWithFilters();
	}
}
