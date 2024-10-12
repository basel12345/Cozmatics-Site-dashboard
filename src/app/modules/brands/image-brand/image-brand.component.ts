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
			if (res.image) this.sanitizationImage(res.image)
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

		this.brandsService.uploadFile(this.id, formData).subscribe(res => {
			this.toastr.success('Image is Uploaded', 'Success');
			this.router.navigate(['brands']);
		});
	}
}
