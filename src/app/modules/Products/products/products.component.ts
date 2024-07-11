
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
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-products',
  standalone: true,
	imports: [TableModule, CommonModule, ButtonModule, CheckboxModule, FormsModule, AddProductsComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
	txt:any
de() {
	console.log(this.txt)
    console.log(this.Encrypt(this.txt));
}

encrypt(data: string): string {
    const encryptedData = CryptoJS.AES.encrypt(data, 'key').toString();
    return encryptedData;
}







public Encrypt(value : string)
{
	let key = CryptoJS.enc.Utf8.parse('13313586896631234900207000800912');
    let   iv =  CryptoJS.enc.Utf8.parse('6896631234900212');
	var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value), key,
	{
		keySize: 128 / 8,
		iv: iv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7
		}).toString();
	return encrypted;
}

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
	navigateToProductReviews(id: number) {
		this.router.navigate([`Reviews/${id}`]);
	}

	navigateToProductAttr(id: number , ProductName:string) {
		this.router.navigate([`AttributeValue/${id}/${ProductName}`]);
	}
}
