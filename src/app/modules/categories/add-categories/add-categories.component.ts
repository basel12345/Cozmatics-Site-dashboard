import { CommonModule } from '@angular/common';
import { CategoriesService } from './../../../shared/service/categories/categories.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-add-categories',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, DropdownModule],
	templateUrl: './add-categories.component.html',
	styleUrl: './add-categories.component.css'
})
export class AddCategoriesComponent implements OnInit {
	category: any;
	categoryForm!: FormGroup;
	categories: any;
	subbmited: boolean = false;
	constructor(
		private route: ActivatedRoute,
		private categoriesService: CategoriesService,
		private fb: FormBuilder,
		private toastr: ToastrService,
		private router: Router
	) { }
	id!: number;
	ngOnInit(): void {
		this.initForm();
		this.getAllCategories();
		this.route.params.subscribe(res => {
			this.id = res["id"];
			if (this.id)
				this.getCategoryByid(this.id);
		});
	}

	getAllCategories() {
		this.categoriesService.getAllCategories().subscribe(res => {
			this.categories = res;
		})
	}

	initForm() {
		this.categoryForm = this.fb.group({
			name: ["", Validators.required],
			nameAr: ["", Validators.required],
			description: ["", Validators.required],
			descriptionAr: ["", Validators.required],
			parentId: null,
			isSelected: false
		})
	}

	getCategoryByid(id: number) {
		this.categoriesService.getCategoryByid(id).subscribe(res => {
			this.category = res;
			this.categoryForm.patchValue(this.category);
		})
	}


	SaveData() {
		if (this.categoryForm.invalid) {
			this.subbmited = true;
			return;
		}
		if (this.id) {
			this.categoriesService.editCategory({ id: this.id, ...this.categoryForm.getRawValue() }).subscribe(res => {
				this.toastr.success('Category is Updated', 'Success');
				this.router.navigate(['categories']);
				this.subbmited = false;
			})
		} else {
			this.categoriesService.addCategory(this.categoryForm.getRawValue()).subscribe(res => {
				this.toastr.success('Category is Saved', 'Success');
				this.router.navigate(['categories']);
				this.subbmited = false;
			})
		}
	}

}
