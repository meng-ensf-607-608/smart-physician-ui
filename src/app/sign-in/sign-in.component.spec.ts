import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgModule } from '@angular/core';
import { SignInComponent } from './sign-in.component';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';  // Import HttpClientTestingModule
import { AuthService } from '../services/auth.service';  // Import AuthService
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule, SignInComponent],
  providers: [AuthService, provideHttpClient(), provideHttpClientTesting()]
})
export class SignInComponentTestingModule {}


describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInComponentTestingModule],
      providers: [HttpTestingController]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController); 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
