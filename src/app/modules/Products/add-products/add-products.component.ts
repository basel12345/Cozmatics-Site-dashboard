import { CommonModule } from '@angular/common';
import { CategoriesService } from './../../../shared/service/categories/categories.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
	barcodesInvalid!: boolean;
	constructor(
		private route: ActivatedRoute,
		private productService: ProductsService,
		private categoriesService: CategoriesService,
		private fb: FormBuilder,
		private toastr: ToastrService,
		private router: Router
	) { }
	id!: number;
	tags: any
	ngOnInit(): void {
		this.initForm();
		this.getAllCategories();
		this.getAllBrands();
		this.route.params.subscribe(res => {
			this.id = res["id"];
			if (!this.id) this.addItem();
			if (this.id)
				this.getProductByid(this.id);
		});
		this.tags = [
			{ id: 0, name: 'Most Popular' },
			{ id: 1, name: 'Recent' },
			{ id: 2, name: 'Best' }
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

	saveBarcode(index: number) {
		this.barcodesInvalid = true;
		if (this.barcodes.at(index).valid) {
			this.productService.addBarCode({ ...this.barcodes.at(index).getRawValue(), ProductId: this.id }).subscribe((res: any) => {
				this.toastr.success('Barcode Saved', 'Success');
				this.barcodesInvalid = false;
				this.barcodes.at(index).markAsPristine();
				this.barcodes.at(index).disable();
				this.barcodes.at(index).get('id')?.patchValue(res.id)
			})
		}

	}

	initForm() {
		this.productForm = this.fb.group({
			name: ["", Validators.required],
			itemNo: [null, Validators.required],
			nameAr: ["", Validators.required],
			description: ["", Validators.required],
			descriptionAr: ["", Validators.required],
			categoryId: [null, Validators.required],
			brandId: [null, Validators.required],
			price: [null, [Validators.required, Validators.min(1)]],
			qty: [0, [Validators.required]],
			discountPercentage: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
			tag: [null],
			vat: [0],
			barcodes: this.fb.array([])
		})
	}

	get barcodes(): FormArray {
		return this.productForm.get('barcodes') as FormArray;
	}

	addItem() {
		if (!this.barcodes.invalid)
			this.barcodes?.push(this.fb.group({
				barcode: ['', Validators.required],
				id: null,
			}));
	}

	addbarcodesById(data: any) {
		data.barcodes.forEach((res: any) => {
			this.barcodes?.push(this.fb.group({
				barcode: res.barcode,
				id: res.id,
			}));
		})
		this.barcodes.disable();
	}

	removeItem(index: number, id: number) {
		if (id) {
			this.productService.deleteBarCode(id).subscribe(res => {
				this.toastr.success('Barcode Removed', 'Success');
				this.barcodes.removeAt(index);
			})
		} else {
			this.barcodes.removeAt(index);
		}
	}

	getProductByid(id: number) {
		this.productService.getProductByid(id).subscribe(res => {
			this.product = res;
			this.productForm.patchValue(this.product);
			this.addbarcodesById(this.product);
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
