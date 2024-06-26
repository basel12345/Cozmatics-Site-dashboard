
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AddProductsComponent } from '../add-products/add-products.component';
import { ProductsService } from '../../../shared/service/products/products.service';

@Component({
  selector: 'app-products',
  standalone: true,
	imports: [TableModule, CommonModule, ButtonModule, CheckboxModule, FormsModule, AddProductsComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products: any;
  constructor(
		private productsService: ProductsService,
		public sanitizer: DomSanitizer,
		private toastr: ToastrService,
		private router: Router
	) { }


  ngOnInit(): void {
    this.getAllProducts();
    console.log(this.products)
	}

	getAllProducts() {
		this.productsService.getAllProducts(1, 10).subscribe((res )=> {
			this.products = res.products;
		});
	}
	sanitizationImage(image: string): SafeResourceUrl {
		return this.sanitizer.bypassSecurityTrustResourceUrl("data:image/png;base64," + image);
	}

	deleteProduct(id: number) {
		this.productsService.deleteProduct(id).subscribe(res => {
			this.toastr.success('Product has been Deleted', 'Success');
			this.getAllProducts();
		})
	}

	navigateToAddProduct() {
		this.router.navigate(["Product"]);
	}

	navigateToEditProduct(id: number) {
		this.router.navigate([`Product/${id}`]);
	}
}
