import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatSnackBarModule,
    HttpClientModule,
    RouterModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  signInForm: FormGroup;
  errorMessage: string = '';
  durationInSeconds: number = 3;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login(): void {
    if (this.signInForm.invalid || this.isLoading) return;

    const { email, password } = this.signInForm.value;
    this.isLoading = true;

    this.authService.login(email, password).subscribe(
      (response) => {
        this.authService.saveToken(response.token);
        this.router.navigate(['/appointments']);
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Login failed. Please check your credentials and try again.';
        this.openSnackBar();
        this.isLoading = false;
      }
    );
  }

  openSnackBar(): void {
    this.snackBar.open(this.errorMessage || 'An error occurred.', 'Close', {
      duration: this.durationInSeconds * 1000,
    });
  }

  navigateToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }
}
