import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
<<<<<<< HEAD
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
=======
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
>>>>>>> dfa8698d7ac4a8915ae07eff6197c54e4a175482

@Component({
  selector: 'app-sign-in',
  standalone: true,
<<<<<<< HEAD
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
=======
  imports: [ReactiveFormsModule, CommonModule], // Only add necessary modules
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  signInForm: FormGroup;
>>>>>>> dfa8698d7ac4a8915ae07eff6197c54e4a175482

  constructor(
    private router: Router,
    private authService: AuthService,
<<<<<<< HEAD
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
=======
    private formBuilder: FormBuilder
  ) {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
>>>>>>> dfa8698d7ac4a8915ae07eff6197c54e4a175482
    });
  }

  login(): void {
<<<<<<< HEAD
    if (this.signInForm.invalid || this.isLoading) return;

    const { email, password } = this.signInForm.value;
    this.isLoading = true;
=======
    if (this.signInForm.invalid) return;

    const { email, password } = this.signInForm.value;
    console.log(email)
>>>>>>> dfa8698d7ac4a8915ae07eff6197c54e4a175482

    this.authService.login(email, password).subscribe(
      (response) => {
        this.authService.saveToken(response.token);
        this.router.navigate(['/appointments']);
<<<<<<< HEAD
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
=======
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }
>>>>>>> dfa8698d7ac4a8915ae07eff6197c54e4a175482
}
