import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionModalComponentComponent } from './prescription-modal-component.component';

describe('PrescriptionModalComponentComponent', () => {
  let component: PrescriptionModalComponentComponent;
  let fixture: ComponentFixture<PrescriptionModalComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrescriptionModalComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrescriptionModalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
