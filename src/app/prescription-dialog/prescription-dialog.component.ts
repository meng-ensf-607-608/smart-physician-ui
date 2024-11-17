// import { Component } from '@angular/core';
// import { MatDialogRef } from '@angular/material/dialog';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-prescription-dialog',
//   standalone: true,
//   imports: [FormsModule, CommonModule],
//   templateUrl: './prescription-dialog.component.html',
//   styleUrls: ['./prescription-dialog.component.css']
// })
// export class PrescriptionDialogComponent {
//   cause: string = '';
//   prescriptions: string[] = [''];

//   constructor(private dialogRef: MatDialogRef<PrescriptionDialogComponent>) {}

//   addPrescription() {
//     this.prescriptions.push('');
//   }

//   removePrescription(index: number) {
//     this.prescriptions.splice(index, 1);
//   }

//   save() {
//     // Add save logic here
//     this.close();
//   }

//   close() {
//     this.dialogRef.close();
//   }

//   isMaximized = false;
//   isMinimized = false;

//   // Toggle maximize and restore
//   toggleMaximize() {
//     console.log('Toggling maximize');
//     if (this.isMaximized) {
//       this.restore();
//     } else {
//       this.maximize();
//     }
//   }

//   // Maximize the window
//   maximize() {
//     this.isMaximized = true;
//     this.isMinimized = false; // Ensure it's not minimized when maximizing
//   }

//   // Restore the window to normal size
//   restore() {
//     this.isMaximized = false;
//     this.isMinimized = false;
//   }

//   // Minimize the window
//   minimize() {
//     this.isMinimized = true;
//     this.isMaximized = false; // Ensure it's not maximized when minimizing
//   }

// }


import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-prescription-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './prescription-dialog.component.html',
  styleUrls: ['./prescription-dialog.component.css'],
})
export class PrescriptionDialogComponent {
  appointmentNotes = {
    appointmentId: '',
    symptoms: '',
    diagnosis: '',
    additionalDetails: '',
  };

  prescriptions = [
    {
      medication: '',
      dosage: '',
      duration: '',
      frequency: '',
    },
  ];

  addPrescription() {
    this.prescriptions.push({
      medication: '',
      dosage: '',
      duration: '',
      frequency: '',
    });
  }

  saveForm() {
    const formData = {
      appointmentNotes: this.appointmentNotes,
      prescriptions: this.prescriptions,
    };
    console.log('Form Data:', formData);
    // Save the data or send it to the server
  }
}
