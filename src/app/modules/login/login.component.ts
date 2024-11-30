import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { InputMaskModule } from 'primeng/inputmask';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/service/auth/auth.service';
import { LoadingService } from '../../shared/service/loading/loading.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [CommonModule, InputTextModule, PasswordModule, DividerModule, InputMaskModule, ButtonModule, ReactiveFormsModule],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
	submitted: boolean = false;
	loginForm!: FormGroup;
	constructor(private fb: FormBuilder, private service: AuthService, private router: Router, private loadingService: LoadingService, private toastr: ToastrService) { }

	ngOnInit(): void {
		this.loadingService.hideLoading();
		this.createLoginForm();
	}

	createLoginForm(): void {
		this.loginForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)]],
		})
	}

	login(): void {
		this.submitted = true;
		if (this.loginForm.valid) {
			this.service.login(this.loginForm.getRawValue()).subscribe((res: any) => {
				sessionStorage.setItem('user', JSON.stringify(res));
				sessionStorage.setItem('token', JSON.stringify(res.token));
				this.router.navigate(['home']);
			}, err => {
				this.toastr.error('Please verify your email and password', 'Error');
				this.loadingService.hideLoading();
			});
		}
	}
}
