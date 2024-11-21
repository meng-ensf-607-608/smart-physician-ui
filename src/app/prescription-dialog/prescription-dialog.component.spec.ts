import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { PrescriptionDialogComponent } from './prescription-dialog.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

class MatDialogRefMock {
  close(): void {} // Mock the close method
}

describe('PrescriptionDialogComponent', () => {
  let component: PrescriptionDialogComponent;
  let fixture: ComponentFixture<PrescriptionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrescriptionDialogComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(),
        { provide: MatDialogRef, useClass: MatDialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrescriptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
