import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { ToastrService } from 'ngx-toastr';
import { BrandsService } from '../../../shared/service/brands/brands.service';

@Component({
	selector: 'app-add-brands',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, DropdownModule],
	templateUrl: './add-brands.component.html',
	styleUrl: './add-brands.component.css'
})
export class AddBrandsComponent implements OnInit {
	brand: any;
	brandForm!: FormGroup;
	brands: any;
	submitted: boolean = false;
	constructor(
		private route: ActivatedRoute,
		private brandsService: BrandsService,
		private fb: FormBuilder,
		private toastr: ToastrService,
		private router: Router
	) { }
	id!: number;
	ngOnInit(): void {
		this.initForm();
		this.route.params.subscribe(res => {
			this.id = res["id"];
			if (this.id)
				this.getBrandByid(this.id);
		});
	}

	initForm() {
		this.brandForm = this.fb.group({
			name: ["", Validators.required],
			nameAr: ["", Validators.required]
		})
	}

	getBrandByid(id: number) {
		this.brandsService.getBrandByid(id).subscribe(res => {
			this.brand = res;
			this.brandForm.patchValue(this.brand);
		})
	}


	SaveData() {
		if (this.brandForm.invalid) {
			this.submitted = true;
			return;
		}
		if (this.id) {
			this.brandsService.editBrand({ id: this.id, ...this.brandForm.getRawValue() }).subscribe(res => {
				this.toastr.success('Brand is Updated', 'Success');
				this.router.navigate(['brands']);
				this.submitted = false;
			})
		} else {
			this.brandsService.addBrand(this.brandForm.getRawValue()).subscribe(res => {
				this.toastr.success('Brand is Saved', 'Success');
				this.router.navigate(['brands']);
				this.submitted = false;
			})
		}
	}

}
