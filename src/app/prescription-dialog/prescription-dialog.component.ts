import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import { MatFormFieldModule
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';
import { response } from 'express';
import { ApiService } from '../services/api.service';

@Component({
  selector: 
 'app-prescription-dialog',
 standalone: true,
  templateUrl: './prescription-dialog.component.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule
  ],
  styleUrls: ['./prescription-dialog.component.css']
})
export class PrescriptionDialogComponent implements OnInit {
  prescriptionForm:FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService, private dialogRef: MatDialogRef<PrescriptionDialogComponent>, private http: HttpClient, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.prescriptionForm = this.fb.group({
      appointmentId: [data.appointmentId, Validators.required],
      symptoms: [data.symptoms, Validators.required],
      diagnosis: ['', Validators.required],
      additionalNotes: [''],
      prescriptions: this.fb.array([
        // this.createPrescriptionFormGroup()
      ])
    });
    this.addPrescription(); // Start with one prescription form
  }


  get prescriptions(): FormArray {
    return this.prescriptionForm.get('prescriptions') as FormArray;
  }


   // Add a new prescription form group
  addPrescription() {
    const prescriptionGroup = this.fb.group({
      medication: ['', Validators.required],
      dosage: ['', Validators.required],
      duration: ['', Validators.required],
      frequency: ['', Validators.required]
    });
    this.prescriptions.push(prescriptionGroup);
  }

  // Remove a prescription form group
  removePrescription(index: number) {
    this.prescriptions.removeAt(index);
  }

  ngOnInit(): void {
  }


// savePrescription(){
//   const formData = this.prescriptionForm.value;
//   console.log(formData);
//   this.dialogRef.close();
// }

savePrescription() {
  const formData = this.prescriptionForm.value;
  const payload = {
    appointmentNotes: [
      {
        appointmentId: formData.appointmentId,
        symptoms: formData.symptoms,
        diagnosis: formData.diagnosis,
        additionalInstructions: formData.additionalNotes,
      },
    ],
    prescriptions: formData.prescriptions.map((prescription: any) => ({
      appointmentId: formData.appointmentId,
      createdAt: new Date().toISOString(), // Set the current date and time
      medication: prescription.medication,
      dosage: prescription.dosage,
      duration: prescription.duration,
      frequency: prescription.frequency,
    })),
  };
  
  console.log('Sending payload:', JSON.stringify(payload, null, 2));
  this.apiService.updateAppointmentDetails(payload).subscribe({
    next: (response) => {
      console.log('Success:', response);
      this.dialogRef.close(response); // Close the dialog and return the response
      
    },
    error: (error) => {
      console.error('Error saving prescription:', error);
      alert(`Error: ${error.message}`);
    },
  });
}
// });
}


