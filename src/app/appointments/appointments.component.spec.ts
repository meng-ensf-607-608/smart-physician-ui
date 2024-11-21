import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { AppointmentsComponent } from './appointments.component';
import { AppointmentsService } from '../services/appointments.service';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing'; // Import this for HttpClient mocking
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { environment } from '../../environments/environment';


describe('AppointmentsComponent', () => {
  let component: AppointmentsComponent;
  let fixture: ComponentFixture<AppointmentsComponent>;
  let httpMock: HttpTestingController;
  const mockEnvironment = {
    apiUrl: 'https://physician-assistant-database-service-38696173603.us-central1.run.app',
  };
  const mockProfile = {
    name: 'Dr. John Doe',
    email: 'john.doe@example.com',
    phoneNumber: '123-456-7890',
    address: '123 Clinic St.'
  };
  const mockAppointments = [
    {
      appointmentId: 1,
      startTime: '2024-11-18T10:00:00',
    },
    {
      appointmentId: 2,
      startTime: '2024-11-18T11:00:00',
    },
  ];

  const mockAppointmentDetails = new Map<string, { patient: { name: string } }>([
    ['1', { patient: { name: 'Jane Smith' } }],
    ['2', { patient: { name: 'Michael Johnson' } }],
  ]);

  const mockAppointmentsService = {
    getAllAppointments: jasmine.createSpy('getAllAppointments').and.returnValue(of(mockAppointments)),
    getAllAppointmentDetails: jasmine
      .createSpy('getAllAppointmentDetails')
      .and.callFake((id: string) => of(mockAppointmentDetails.get(id))),
    getProfileData: jasmine.createSpy('getProfileData').and.returnValue(of(mockProfile)),
  };

  beforeEach(waitForAsync( () => {
    TestBed.configureTestingModule({
      imports: [AppointmentsComponent, CommonModule],
      declarations: [],
      providers: [provideHttpClientTesting(),provideHttpClient(),{ provide: AppointmentsService, useValue: mockAppointmentsService}],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentsComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should fetch and display appointments', () => {
  
    component.appointments = mockAppointments.map((appt) => ({
      ...appt,
      appointmentId: appt.appointmentId.toString(), // Ensure ID matches the Map keys
    }));
  
    component.appointmentDetails = mockAppointmentDetails;
  
    component.fetchAppointments();
    fixture.detectChanges();
  
    // Verify calls to the service
    expect(mockAppointmentsService.getAllAppointments).toHaveBeenCalledTimes(1);
    expect(mockAppointmentsService.getAllAppointmentDetails).toHaveBeenCalledTimes(1);
  
    // Verify DOM updates
    const appointmentElements = fixture.debugElement.queryAll(By.css('.appointments-list ul li'));
    expect(appointmentElements.length).toBe(mockAppointments.length);
    
    expect(appointmentElements[0].nativeElement.textContent).toContain('Jane Smith');
    expect(appointmentElements[1].nativeElement.textContent).toContain('Michael Johnson');
  });

  it('should display fallback message if no appointments', () => {
    component.appointments = [];
    fixture.detectChanges();
    const fallbackElement = fixture.debugElement.query(By.css('.appointments-list p'));
    expect(fallbackElement).toBeTruthy();
    expect(fallbackElement.nativeElement.textContent).toContain('No appointments scheduled for today.');
  });

  it('should display profile information', () => {
    // Check profile rendering
    const profileName = fixture.debugElement.query(By.css('.profile-section h2'));
    const emailField = fixture.debugElement.query(By.css('.profile-details .profile-field:first-child + span'));
    const phoneField = fixture.debugElement.query(By.css('.profile-details .profile-detail:nth-child(2) span:nth-child(2)'));
    const addressField = fixture.debugElement.query(By.css('.profile-details .profile-detail:nth-child(3) span:nth-child(2)'));

    expect(profileName.nativeElement.textContent).toContain("Dr. John Doe's Profile");
    expect(emailField.nativeElement.textContent).toContain('john.doe@example.com');
    expect(phoneField.nativeElement.textContent).toContain('123-456-7890');
    expect(addressField.nativeElement.textContent).toContain('123 Clinic St.');
  });

  it('should navigate to patient details when appointment is clicked', () => {
    component.appointments = mockAppointments.map((appt) => ({
      ...appt,
      appointmentId: appt.appointmentId.toString(), // Convert ID to string to match the Map keys
    }));
    component.appointmentDetails = mockAppointmentDetails;
    spyOn(component, 'navigateToPatientDetails').and.callThrough();
    
    fixture.detectChanges();
    const appointmentElement = fixture.debugElement.query(By.css('.appointments-list ul li:first-child'));
    if (appointmentElement) {
      appointmentElement.nativeElement.click();
      const patientDetails = mockAppointmentDetails.get('1');
        expect(component.navigateToPatientDetails).toHaveBeenCalledWith(patientDetails, '1');
    } else {
      fail('No appointment element found in the DOM.');
    }
  });
});
