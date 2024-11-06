import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [],
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']  // Note the correction to "styleUrls" instead of "styleUrl"
})
export class PatientDetailsComponent implements OnInit {
  patientData: any;

  constructor(private router: Router) {
    // Retrieve the state data (patient details) passed from the Appointments component
    const navigation = this.router.getCurrentNavigation();
    this.patientData = navigation?.extras.state?.['data'];
  }

  ngOnInit(): void {}

  submitForm() {
    // Placeholder for form submission logic (e.g., displaying suggestions)
    console.log("Form submitted with patient data:", this.patientData);
  }
}
