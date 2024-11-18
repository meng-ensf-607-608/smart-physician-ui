import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [provideHttpClientTesting()], // Import HttpClientTestingModule here
      providers: [AuthService], // Provide AuthService
    });

    service = TestBed.inject(AuthService); // Inject the AuthService
    httpMock = TestBed.inject(HttpTestingController); // Inject HttpTestingController
  });

  afterEach(() => {
    httpMock.verify(); // Verify no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform a login', () => {
    const mockResponse = { token: '12345' };
    const loginData = { email: 'test@example.com', password: 'password' };

    service.login(loginData.email, loginData.password).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    // Mock the HTTP POST request
    const req = httpMock.expectOne('https://physician-assistant-database-service-38696173603.us-central1.run.app/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse); // Respond with mock data
  });
});
