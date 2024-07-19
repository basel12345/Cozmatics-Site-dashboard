import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { UsersService } from '../../shared/service/users/users.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule, CheckboxModule, FormsModule, PaginatorModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users: any;
  first: number = 1;
  totalCount!: number;
  page: number = 1;
  constructor(
    public sanitizer: DomSanitizer,
    private toastr: ToastrService,
    private router: Router,
    private customerService: UsersService
  ) { }

  ngOnInit(): void {
    this.getAllusers();
  }

  gettSalesOrderCount() {
    this.customerService.gettUsersCount().subscribe(res => {
      this.totalCount = res;
    });
  }

  getAllusers() {
    this.customerService.getAllUsers(this.page, 10).subscribe(res => {
      this.users = res;
      this.gettSalesOrderCount();
    });
  }
  sanitizationImage(image: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl("data:image/png;base64," + image);
  }

  navigateToAddBrand() {
    this.router.navigate(["brand"]);
  }

  onPageChange(event: PaginatorState) {
    if (event.page || event.page === 0) this.page = event.page + 1;
    if (event.first || event.first === 0) this.first = event.first + 1;
    this.getAllusers();
  }

}
