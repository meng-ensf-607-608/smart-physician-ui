import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { LlmService } from './llm.service';  // Import your service
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

describe('LlmService', () => {
  let service: LlmService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ CommonModule], // Import HttpClientTestingModule here
      providers: [LlmService, provideHttpClientTesting(), provideHttpClient()], // Provide the LlmService
    });

    service = TestBed.inject(LlmService); // Inject the LlmService
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();  // Ensure no HTTP requests remain unhandled
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
