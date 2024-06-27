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

@Component({
	selector: 'app-brands',
	standalone: true,
	imports: [TableModule, CommonModule, ButtonModule, CheckboxModule, FormsModule, AddBrandsComponent],
	templateUrl: './brands.component.html',
	styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit {
	brands: any;
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
		this.brandsService.getAllBrands().subscribe(res => {
			this.brands = res;
		});
	}
	sanitizationImage(image: string): SafeResourceUrl {
		return this.sanitizer.bypassSecurityTrustResourceUrl("data:image/png;base64," + image);
	}

	deleteBrand(id: number) {
		this.brandsService.deleteBrand(id).subscribe(res => {
			this.toastr.success('Brand is Deleted', 'Success');
			this.getAllbrands();
		})
	}

	navigateToAddBrand() {
		this.router.navigate(["brand"]);
	}

	navigateToEditBrand(id: number) {
		this.router.navigate([`brand/${id}`]);
	}
}
