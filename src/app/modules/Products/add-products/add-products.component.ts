import { CommonModule } from '@angular/common';
import { CategoriesService } from './../../../shared/service/categories/categories.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../../../shared/service/products/products.service';

@Component({
	selector: 'app-add-products',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, DropdownModule],
	templateUrl: './add-products.component.html',
	styleUrl: './add-products.component.css'
})
export class AddProductsComponent {

	categories: any;
	brands: any;
	productForm!: FormGroup;
	product: any;
	submitted: boolean = false;
	constructor(
		private route: ActivatedRoute,
		private productService: ProductsService,
		private categoriesService: CategoriesService,
		private fb: FormBuilder,
		private toastr: ToastrService,
		private router: Router
	) { }
	id!: number;
	tags:any
	ngOnInit(): void {
		this.initForm();
		this.getAllCategories();
		this.getAllBrands();
		this.route.params.subscribe(res => {
			this.id = res["id"];
			if (this.id)
				this.getProductByid(this.id);
		});
     this.tags =[
		{id:0,name:'Most Popular'},
		{id:1,name:'Recent'},
		{id:2,name:'Best'}
	 ]		
	}

	getAllCategories() {
		this.categoriesService.getAllCategories().subscribe(res => {
			this.categories = res;
		})
	}
	getAllBrands() {
		this.productService.getAllBrands().subscribe(res => {
			this.brands = res;
		})
	}

	initForm() {
		this.productForm = this.fb.group({
			name: ["", Validators.required],
			nameAr: ["", Validators.required],
			description: ["", Validators.required],
			descriptionAr: ["", Validators.required],
			categoryId: [null, Validators.required],
			brandId: [null, Validators.required],
			price: [null, [Validators.required, Validators.min(1)]],
			qty: [null, [Validators.required, Validators.min(1)]],
			discountPercentage: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
			tag: [null],
			vat: [0]
		})
	}

	getProductByid(id: number) {
		this.productService.getProductByid(id).subscribe(res => {
			this.product = res;
			this.productForm.patchValue(this.product);
		})
	}


	SaveData() {
		const brandId = this.productForm.get("brandId")?.getRawValue();
		if (brandId) this.productForm.get("parentId")?.patchValue(+brandId);
		this.productForm.get("vat")?.patchValue(this.productForm.get("vat")?.getRawValue() ? 1 : 0);
		const tag = this.productForm.get("tag")?.getRawValue();
		if (tag) this.productForm.get("tag")?.patchValue(+tag);
		if (this.productForm.invalid) {
			this.submitted = true;
			return;
		}
		if (this.id) {
			this.productService.editProduct({ id: this.id, ...this.productForm.getRawValue() }).subscribe(res => {
				this.toastr.success('Product Updated', 'Success');
				this.router.navigate(['Products']);
				this.submitted = false;
			})
		} else {
			this.productService.addProduct(this.productForm.getRawValue()).subscribe(res => {
				this.toastr.success('Product Saved', 'Success');
				this.router.navigate(['Products']);
				this.submitted = false;
			})
		}
	}
}
