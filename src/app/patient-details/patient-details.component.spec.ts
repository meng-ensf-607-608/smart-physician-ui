import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { PatientDetailsComponent } from './patient-details.component';
import { LlmService } from '../services/llm.service';
import { CommonModule } from '@angular/common'; 

describe('PatientDetailsComponent', () => {
  let component: PatientDetailsComponent;
  let service: LlmService;
  let httpMock: HttpTestingController;
  let fixture: ComponentFixture<PatientDetailsComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports:[PatientDetailsComponent, provideHttpClientTesting(), CommonModule],
      providers: [
        LlmService// Use provideHttpClientTesting instead of HttpClientModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PatientDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(LlmService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(PatientDetailsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  // Add other tests here
});
