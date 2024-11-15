import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlmSuggestionsComponent } from './llm-suggestions.component';

describe('LlmSuggestionsComponent', () => {
  let component: LlmSuggestionsComponent;
  let fixture: ComponentFixture<LlmSuggestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LlmSuggestionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LlmSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
