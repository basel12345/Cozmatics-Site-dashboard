import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AddAdvertisementsComponent } from './add-advertisement/add-advertisement.component';
import { AdvertisementsService } from '../../shared/service/advertisement/advertisement.service';

@Component({
	selector: 'app-advertisements',
	standalone: true,
	imports: [TableModule, CommonModule, ButtonModule, CheckboxModule, FormsModule, AddAdvertisementsComponent],
	templateUrl: './advertisement.component.html',
	styleUrl: './advertisement.component.css'
})
export class AdvertisementsComponent implements OnInit {
	advertisements: any;
	constructor(
		private advertisementsService: AdvertisementsService,
		public sanitizer: DomSanitizer,
		private toastr: ToastrService,
		private router: Router
	) { }

	ngOnInit(): void {
		this.getAlladvertisements();
	}

	getAlladvertisements() {
		this.advertisementsService.getAllAdvertisements().subscribe(res => {
			this.advertisements = res;
		});
	}
	sanitizationImage(image: string): SafeResourceUrl {
		return this.sanitizer.bypassSecurityTrustResourceUrl("data:image/png;base64," + image);
	}

	deleteAdvertisement(id: number) {
		this.advertisementsService.deleteAdvertisement(id).subscribe(res => {
			this.toastr.success('Advertisement is Deleted', 'Success');
			this.getAlladvertisements();
			this.advertisements = this.advertisements.filter((res: any) => res.id !== id);
		})
	}

	navigateToAddAdvertisement() {
		this.router.navigate(["advertisement"]);
	}

	navigateToEditAdvertisement(id: number) {
		this.router.navigate([`advertisement/${id}`]);
	}

	changePhoto(id: number) {
		this.router.navigate([`image-advertisement/${id}`])
	}
}
