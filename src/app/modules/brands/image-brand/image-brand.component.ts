import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CategoriesService } from '../../../shared/service/categories/categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrandsService } from '../../../shared/service/brands/brands.service';

@Component({
	selector: 'app-image-brand',
	standalone: true,
	imports: [],
	templateUrl: './image-brand.component.html',
	styleUrl: './image-brand.component.css'
})
export class ImageBrandComponent {
	fileName: string | null | ArrayBuffer | SafeResourceUrl = 'assets/placeholder.jpg';
	id!: number;
	fileToUpload: any;
	defaultImage: string | null | ArrayBuffer | SafeResourceUrl = 'assets/placeholder.jpg';
	imageWidth!: number;
	imageHeight!: number;


	constructor(
		private brandsService: BrandsService,
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
		this.brandsService.getBrandByid(this.id).subscribe(res => {
			if (res.imagePath) {
				this.defaultImage = "https://api-endpoint.abaqelanayah.com" + res.imagePath;
				this.fileName = this.defaultImage;
			}
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
				if (this.imageHeight !== 80 || this.imageWidth !== 120) {
					this.fileToUpload = null;
					this.fileName = this.defaultImage;
					this.toastr.error("Width must be 120 and length must be 80")
				}
			};
			img.src = _event.target?.result as string;
		}
	}
	uploadFileToActivity() {
		if (this.fileToUpload) {
			const formData = new FormData()
			formData.append("file", this.fileToUpload)
			this.brandsService.uploadFile(this.id, formData).subscribe(res => {
				this.toastr.success('Image is Uploaded', 'Success');
				this.router.navigate(['brands']);
			});
		}
	}
}
