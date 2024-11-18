import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LlmSuggestionsComponent } from './llm-suggestions.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

describe('LlmSuggestionsComponent', () => {
  let component: LlmSuggestionsComponent;
  let fixture: ComponentFixture<LlmSuggestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule, LlmSuggestionsComponent, provideHttpClientTesting(), HttpTestingController], // Import any necessary modules
    }).compileComponents();

    fixture = TestBed.createComponent(LlmSuggestionsComponent);
    component = fixture.componentInstance;

    // Provide mock data for @Input() suggestions
    component.suggestions = {
      likely_causes: ['Flu', 'Cold', 'Allergy'], // Mock data
      possible_treatments: ['Rest', 'Medication', 'Hydration'],
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display likely causes', () => {
    const compiled = fixture.nativeElement;
    const causes = compiled.queryAll('.likely-causes');
    expect(causes.length).toBe(3);
    expect(causes[0].textContent).toContain('Flu');
  });

  it('should display possible treatments', () => {
    const compiled = fixture.nativeElement;
    const treatments = compiled.querySelectorAll('.possible-treatments-item');
    expect(treatments.length).toBe(3);
    expect(treatments[0].textContent).toContain('Rest');
  });
});
