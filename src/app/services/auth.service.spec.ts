import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable, Inject } from '@angular/core';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const mockApiUrl = 'https://physician-assistant-database-service-38696173603.us-central1.run.app';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClientTesting(), provideHttpClient(withInterceptors([])),
      { 
        provide: AuthService,
        useFactory: (http: HttpClient, router: Router) => new AuthService(http, router), // Inject mockApiUrl into AuthService
        deps: [HttpClient],
        mockApiUrl,
      },
    ],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  xit('should perform a login', () => {
    const mockResponse = { token: 'mock-jwt-token' };
    const loginData = { email: 'test@example.com', password: 'password' };

    service.login(loginData.email, loginData.password).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${mockApiUrl}/auth/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(loginData);
    req.flush(mockResponse);
  });
});
