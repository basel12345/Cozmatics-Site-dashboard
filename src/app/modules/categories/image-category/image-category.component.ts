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
	imageWidth!: number;
	imageHeight!: number;
	defaultImage: string | ArrayBuffer | SafeResourceUrl | null = 'assets/placeholder.jpg';

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
			if (res.imagePath) { }
			this.defaultImage = "https://api-endpoint.abaqelanayah.com" + res.imagePath;
			this.fileName = this.defaultImage;
		})
	}

	handleFileInput(files: any) {
		let reader = new FileReader();
		this.fileToUpload = files.files[0];
		reader.readAsDataURL(files.files[0]);
		reader.onload = (_event) => {
			this.fileName = reader.result;
			const img = new Image();
			img.onload = () => {
				this.imageWidth = img.width;
				this.imageHeight = img.height;
				if (this.imageHeight !== 1000 || this.imageWidth !== 1000) {
					this.fileToUpload = null;
					this.fileName = this.defaultImage;
					this.toastr.error("Width must be 1000 and length must be 1000")
				}
			};
			img.src = _event.target?.result as string;
		}
	}
	uploadFileToActivity() {
		if (this.fileToUpload) {
			const formData = new FormData()
			formData.append("file", this.fileToUpload)
			this.categoriesService.uploadFile(this.id, formData).subscribe(res => {
				this.toastr.success('Image is Uploaded', 'Success');
				this.router.navigate(['categories']);
			});
		}
	}
}
