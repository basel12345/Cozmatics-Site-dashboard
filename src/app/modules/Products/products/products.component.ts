
import { Component, OnInit } from '@angular/core';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AddProductsComponent } from '../add-products/add-products.component';
import { ProductsService } from '../../../shared/service/products/products.service';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { FilterMatchMode, FilterMetadata, SelectItem } from 'primeng/api';

@Component({
	selector: 'app-products',
	standalone: true,
	imports: [TableModule, CommonModule, ButtonModule, CheckboxModule, FormsModule, AddProductsComponent, PaginatorModule],
	templateUrl: './products.component.html',
	styleUrl: './products.component.css'
})
export class ProductsComponent {
	products: any;
	first: number = 1;
	totalCount!: number;
	page: number = 1;
	loading: boolean = false;
	matchModeOptions: SelectItem[];
	Filters: { [s: string]: FilterMetadata | FilterMetadata[] | undefined; } | undefined;
	constructor(
		private productsService: ProductsService,
		public sanitizer: DomSanitizer,
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
		this.getAllProductsWithFilters();
	  }
	getAllProductsWithFilters() {
		this.productsService.getAllProductsWithFilters(this.page, 10,this.Filters).subscribe((res:any) => {
			this.products = res.products;
			this.totalCount = res.totalCount
		});
	}
	sanitizationImage(image: string): SafeResourceUrl {
		return this.sanitizer.bypassSecurityTrustResourceUrl("data:image/png;base64," + image);
	}

	deleteProduct(id: number) {
		this.productsService.deleteProduct(id).subscribe(res => {
			this.toastr.success('Product has been Deleted', 'Success');
			this.getAllProductsWithFilters();
		})
	}

	navigateToAddProduct() {
		this.router.navigate(["Product"]);
	}

	navigateToEditProduct(id: number) {
		this.router.navigate([`Product/${id}`]);
	}
	navigateToProductReviews(id: number) {
		this.router.navigate([`Reviews/${id}`]);
	}

	navigateToProductAttr(id: number , ProductName:string) {
		this.router.navigate([`AttributeValue/${id}/${ProductName}`]);
	}
	navigateToImages(id: number) {
		this.router.navigate([`images-product/${id}`]);
	}
	changePhoto(id: number) {
		this.router.navigate([`add-image/${id}`])
	}

	onPageChange(event: PaginatorState) {
		if(event.page || event.page === 0) this.page = event.page + 1;
		if(event.first || event.first === 0) this.first = event.first + 1;
		this.getAllProductsWithFilters()
	}
}
