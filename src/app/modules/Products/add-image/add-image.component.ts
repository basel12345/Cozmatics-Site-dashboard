import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ProductsService } from '../../../shared/service/products/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-image',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-image.component.html',
  styleUrl: './add-image.component.css'
})
export class AddImageComponent {
  fileName: string | null | ArrayBuffer | SafeResourceUrl = 'assets/placeholder.jpg';
	id!: number;
	fileToUpload: any;
  isCover: boolean = false;
	constructor(
		private productsService: ProductsService,
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
    const isCover = this.isCover === true ? 1 : 0
		this.productsService.uploadFile(this.id, isCover, formData).subscribe(res => {
			this.toastr.success('Image is Uploaded', 'Success');
			this.router.navigate(['Products']);
		});
	}
}
