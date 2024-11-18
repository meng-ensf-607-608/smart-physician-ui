import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppointmentsComponent } from './appointments.component';
import { AppointmentsService } from '../services/appointments.service';
import { provideHttpClientTesting } from '@angular/common/http/testing'; // Import this for HttpClient mocking
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

describe('AppointmentsComponent', () => {
  let component: AppointmentsComponent;
  let fixture: ComponentFixture<AppointmentsComponent>;
  let mockAppointmentsService: any;

  beforeEach(async () => {
    // Mock AppointmentsService
    mockAppointmentsService = {
      getAppointments: jasmine.createSpy('getAppointments').and.returnValue(of([])),
    };

    await TestBed.configureTestingModule({
      imports: [provideHttpClientTesting(), AppointmentsComponent, CommonModule], // Add HttpClientTestingModule
      declarations: [],
      providers: [
        { provide: AppointmentsService, useValue: mockAppointmentsService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger component initialization
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AppointmentsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should fetch appointments on init', () => {
    expect(mockAppointmentsService.getAppointments).toHaveBeenCalled();
  });
});
