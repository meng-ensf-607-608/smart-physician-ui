import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-prescription-modal-component',
  standalone: true,
  imports: [],
  templateUrl: './prescription-modal-component.component.html',
  styleUrl: './prescription-modal-component.component.css'
})
export class PrescriptionModalComponentComponent {
  constructor(public modal: NgbActiveModal) {}

}
