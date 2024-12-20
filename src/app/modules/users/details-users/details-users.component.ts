import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../shared/service/users/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-users',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './details-users.component.html',
  styleUrl: './details-users.component.css'
})
export class DetailsUsersComponent implements OnInit {
  user: any;
  address: any;
  constructor(
    private userService: UsersService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(res => {
      this.userService.addressByCustNo(res['id']).subscribe(res => {
        this.address = res;
      })
      this.userService.getUserById(res['id']).subscribe(res => {
        this.user = res;
      })
    })
  }

}
