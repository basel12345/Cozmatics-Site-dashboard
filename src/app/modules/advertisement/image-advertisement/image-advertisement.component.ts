import { Component } from '@angular/core';
import { BrandsService } from '../../../shared/service/brands/brands.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdvertisementsService } from '../../../shared/service/advertisement/advertisement.service';

@Component({
	selector: 'app-image-advertisement',
	standalone: true,
	imports: [],
	templateUrl: './image-advertisement.component.html',
	styleUrl: './image-advertisement.component.css'
})
export class ImageAdvertisementComponent {
	fileName: string | null | ArrayBuffer | SafeResourceUrl = 'assets/placeholder.jpg';
	defaultImage: string | null | ArrayBuffer | SafeResourceUrl = 'assets/placeholder.jpg';
	id!: number;
	fileToUpload: any;
	imageWidth!: number;
	imageHeight!: number;

	constructor(
		private advertisementsService: AdvertisementsService,
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
		this.advertisementsService.getAdvertisementByid(this.id).subscribe(res => {
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
				if (this.imageHeight > 300 || this.imageWidth > 1400) {
					this.fileToUpload = null;
					this.fileName = this.defaultImage;
					this.toastr.error("Width must be 300 and length must be 1400")
				}
			};
			img.src = _event.target?.result as string;
		};

	}
	uploadFileToActivity() {
		if (this.fileToUpload) {
			const formData = new FormData()
			formData.append("file", this.fileToUpload)
			this.advertisementsService.uploadFile(this.id, formData).subscribe(res => {
				this.toastr.success('Image is Uploaded', 'Success');
				this.router.navigate(['advertisements']);
			});
		}
	}
}
