import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import { MatFormFieldModule
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

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
  prescriptionForm:
 FormGroup;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<PrescriptionDialogComponent>, private http: HttpClient) {
    this.prescriptionForm = this.fb.group({
      appointmentId: ['', Validators.required],
      symptoms: ['', Validators.required],
      diagnosis: ['', Validators.required],
      additionalNotes: [''],
      medication: ['', Validators.required],
      dosage: ['', Validators.required],
      duration: ['', Validators.required],
      frequency: ['', Validators.required],
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

  // Backend API URL
  const apiUrl = environment.apiUrl + 'v1/appointments/update';

  this.http.post(apiUrl, formData).subscribe({
    next: (response) => {
      console.log('Prescription saved successfully:', response);
      this.dialogRef.close();
    },
    error: (error) => {
      console.error('Error saving prescription:', error);
    },
  });
}
}