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

  // Object to hold prescription details
  prescriptionDetails = {
    cause: '',
    prescription: ''
  };

  // Method to open the Prescription Popup
  openPrescriptionPopup() {
    const modal = document.getElementById('modalOverlay');
    if (modal) {
      modal.style.display = 'block';  // Show the modal
    }
  }

  // Method to close the Prescription Popup
  closePrescriptionPopup() {
    const modal = document.getElementById('modalOverlay');
    if (modal) {
      modal.style.display = 'none';  // Hide the modal
    }
  }

  // Method to save the prescription details and close the popup
  savePrescription() {
    console.log('Saving prescription details:', this.prescriptionDetails);
    this.closePrescriptionPopup();
  }

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
