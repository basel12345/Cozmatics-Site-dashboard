import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../shared/service/categories/categories.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-image-category',
	standalone: true,
	imports: [],
	templateUrl: './image-category.component.html',
	styleUrl: './image-category.component.css'
})
export class ImageCategoryComponent implements OnInit {
	fileName: string | null | ArrayBuffer | SafeResourceUrl = 'assets/placeholder.jpg';
	id!: number;
	fileToUpload: any;

	constructor(
		private categoriesService: CategoriesService,
		private route: ActivatedRoute,
		public sanitizer: DomSanitizer,
		private router: Router,
		private toastr: ToastrService
	) {
		this.route.params.subscribe(res => {
			this.id = +res['id']
		})
	}

	ngOnInit(): void {
		this.categoriesService.getCategoryByid(this.id).subscribe(res => {
			if (res.img) this.sanitizationImage(res.img)
		})
	}

	sanitizationImage(image: string) {
		this.fileName = this.sanitizer.bypassSecurityTrustResourceUrl("data:image/png;base64," + image);
	}

	handleFileInput(files: any) {
		let reader = new FileReader();
		this.fileToUpload = files.files[0];
		reader.readAsDataURL(files.files[0]);
		reader.onload = (_event) => {
			this.fileName = reader.result;
		}
	}
	uploadFileToActivity() {
		const formData = new FormData()
		formData.append("file", this.fileToUpload)

		this.categoriesService.uploadFile(this.id, formData).subscribe(res => {
			this.toastr.success('Image is Uploaded', 'Success');
			this.router.navigate(['categories']);
		});
	}
}
