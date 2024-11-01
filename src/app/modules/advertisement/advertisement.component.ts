import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AddAdvertisementsComponent } from './add-advertisement/add-advertisement.component';
import { AdvertisementsService } from '../../shared/service/advertisement/advertisement.service';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
	selector: 'app-advertisements',
	standalone: true,
	imports: [TableModule, CommonModule, ButtonModule, CheckboxModule, FormsModule, AddAdvertisementsComponent, PaginatorModule],
	templateUrl: './advertisement.component.html',
	styleUrl: './advertisement.component.css'
})
export class AdvertisementsComponent implements OnInit {
	advertisements: any;
	first: number = 1;
	totalCount!: number;
	page: number = 1;
	constructor(
		private advertisementsService: AdvertisementsService,
		private toastr: ToastrService,
		private router: Router
	) { }

	ngOnInit(): void {
		this.getAlladvertisements();
		this.getAllCount();
	}

	getAlladvertisements() {
		this.advertisementsService.getAllWithPaging(this.page, 10).subscribe(res => {
			this.advertisements = res?.['advertisements'];
		});
	}

	getAllCount() {
		this.advertisementsService.getAllCount().subscribe(res => {
			this.totalCount = res;
			console.log(this.totalCount);

		});
	}
	deleteAdvertisement(id: number) {
		this.advertisementsService.deleteAdvertisement(id).subscribe(res => {
			this.toastr.success('Advertisement is Deleted', 'Success');
			this.getAlladvertisements();
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

	onPageChange(event: PaginatorState) {
		if (event.page || event.page === 0) this.page = event.page + 1;
		if (event.first || event.first === 0) this.first = event.first + 1;
		this.getAlladvertisements();
	}
}
