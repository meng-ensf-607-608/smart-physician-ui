import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LlmSuggestionsComponent } from './llm-suggestions.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';

describe('LlmSuggestionsComponent', () => {
  let component: LlmSuggestionsComponent;
  let fixture: ComponentFixture<LlmSuggestionsComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule, LlmSuggestionsComponent],
      providers: [
        provideHttpClient(), // Provide HttpClient
        provideHttpClientTesting(), // Provide HttpTestingBackend
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LlmSuggestionsComponent);
    component = fixture.componentInstance;

    // Provide mock data for @Input() suggestions
    component.suggestions = {
      likely_causes: [{ cause: 'Flu', symptoms: 'Fever, chills, body aches' },
        { cause: 'Cold', symptoms: 'Sneezing, runny nose, sore throat' },
        { cause: 'Allergy', symptoms: 'Itchy eyes, sneezing, rash' }], // Mock data
        lifestyle_changes: ['Exercise', 'Sleep more', 'Stress management'],
        dietary_changes: ['Increase water intake', 'Eat more fiber'],
    };

    httpMock = TestBed.inject(HttpTestingController); 

    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no pending HTTP requests
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display likely causes', () => {
    const compiled = fixture.debugElement.nativeElement;
    const causes = compiled.querySelectorAll('.suggestion-item');
    expect(causes.length).toBe(3);
    expect(causes[0].textContent).toContain('Flu');
    expect(causes[0].textContent).toContain('Fever, chills, body aches');
  });

  it('should display lifestyle changes', () => {
    const compiled = fixture.debugElement.nativeElement;
    const lifestyleChanges = compiled.querySelectorAll('.lifestyle-card ul li');
    expect(lifestyleChanges.length).toBe(3);
    expect(lifestyleChanges[0].textContent).toContain('Exercise');
  });

  it('should display dietary changes', () => {
    const compiled = fixture.debugElement.nativeElement;
    const dietaryChanges = compiled.querySelectorAll('.dietary-card ul li');
    expect(dietaryChanges.length).toBe(2);
    expect(dietaryChanges[0].textContent).toContain('Increase water intake');
  });
});
