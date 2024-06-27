import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { ToastrService } from 'ngx-toastr';
import { AdvertisementsService } from '../../../shared/service/advertisement/advertisement.service';
import { CategoriesService } from '../../../shared/service/categories/categories.service';
import { BrandsService } from '../../../shared/service/brands/brands.service';
import { Tags } from '../../../enums/tags';

@Component({
	selector: 'app-add-advertisements',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, DropdownModule],
	templateUrl: './add-advertisement.component.html',
	styleUrl: './add-advertisement.component.css'
})
export class AddAdvertisementsComponent implements OnInit {
	categories: any;
	brands: any;
	advertisement: any;
	advertisementForm!: FormGroup;
	advertisements: any;
	submitted: boolean = false;
	tagKeys:any;
	tags = Tags;
	constructor(
		private route: ActivatedRoute,
		private advertisementsService: AdvertisementsService,
		private categoriesService: CategoriesService,
		private brandsService: BrandsService,
		private fb: FormBuilder,
		private toastr: ToastrService,
		private router: Router
	) { }
	counter=0;
	id!: number;
	ngOnInit(): void {
		this.tagKeys= Object.keys(this.tags);
		this.tagKeys = this.tagKeys.slice(0,this.tagKeys.length / 2);
		this.initForm();
		this.route.params.subscribe(res => {
			this.id = res["id"];
			if (this.id)
				this.getAdvertisementByid(this.id);
		});
		this.getAllBrands();
		this.getAllCategories();
	}

	getAllCategories() {
		this.categoriesService.getAllCategories().subscribe(res => {
			this.categories = res;
			console.log(res);
		})
	}
	getAllBrands() {
		this.brandsService.getAllBrands().subscribe(res => {
			this.brands = res;
		})
	}

	initForm() {
		this.advertisementForm = this.fb.group({
			tag:null,
			discount: Number,
			brandId: Number,
			categoryId: Number
		})
	}

	getAdvertisementByid(id: number) {
		this.advertisementsService.getAdvertisementByid(id).subscribe(res => {
			this.advertisement = res;
			this.advertisementForm.patchValue(this.advertisement);
			console.log(this.advertisementForm);
		})
	}


	SaveData() {
		
		var tagCheck = this.advertisementForm.controls['tag'].value;
		var brandIdCheck = this.advertisementForm.controls['brandId'].value;
		var categoryIdCheck = this.advertisementForm.controls['categoryId'].value;
		var discountCheck = this.advertisementForm.controls['discount'].value;

		if (!tagCheck&&!brandIdCheck&&!categoryIdCheck&&!discountCheck) {
			this.submitted = true;
			this.toastr.error('Enter At least Category or Brand Or Tag Or Discount', 'Error');
			return;
		}
		if (this.id) {
			this.advertisementsService.editAdvertisement({ id: this.id, ...this.advertisementForm.getRawValue() }).subscribe(res => {
				this.toastr.success('Advertisement is Updated', 'Success');
				this.router.navigate(['advertisements']);
				this.submitted = false;
			})
		} else {
			this.advertisementsService.addAdvertisement(this.advertisementForm.getRawValue()).subscribe(res => {
				this.toastr.success('Advertisement is Saved', 'Success');
				this.router.navigate(['advertisements']);
				this.submitted = false;
			})
		}
	}

}
