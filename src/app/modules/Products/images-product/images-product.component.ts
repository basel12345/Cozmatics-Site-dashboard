import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { ProductsService } from '../../../shared/service/products/products.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({
	selector: 'app-images-product',
	standalone: true,
	imports: [ButtonModule, CommonModule, TableModule],
	templateUrl: './images-product.component.html',
	styleUrl: './images-product.component.css'
})
export class ImagesProductComponent implements OnInit {
	id!: number;
	productImgs: any;
	constructor(
		private productsService: ProductsService,
		public sanitizer: DomSanitizer,
		private toastr: ToastrService,
		private router: Router,
		private route: ActivatedRoute
	) { }

	ngOnInit(): void {
		this.route.params.subscribe(res => {
			this.id = +res['id'];
			this.getProductDetails(+res['id'])
		})
	}

	getProductDetails(id: number) {
		this.productsService.getProductDetails(id).subscribe(res => {
			this.productImgs = res['productImgs'];
			console.log(this.productImgs);
			
		})
	}

	sanitizationImage(image: string): SafeResourceUrl {
		return this.sanitizer.bypassSecurityTrustResourceUrl("data:image/png;base64," + image);
	}

	deleteImage(id: number) {
		this.productsService.deleteImageProduct(id).subscribe(res => {
			this.productImgs = this.productImgs.filter((img: any) => img.id !== id);
			this.toastr.success('Image has been Deleted', 'Success');
		})
	}

	changePhoto() {
		this.router.navigate([`add-image/${this.id}`])
	}
}
