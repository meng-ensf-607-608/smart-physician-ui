import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { LlmService } from './llm.service';  // Import your service

describe('LlmService', () => {
  let service: LlmService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [provideHttpClientTesting()], // Import HttpClientTestingModule here
      providers: [LlmService], // Provide the LlmService
    });

    service = TestBed.inject(LlmService); // Inject the LlmService
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
