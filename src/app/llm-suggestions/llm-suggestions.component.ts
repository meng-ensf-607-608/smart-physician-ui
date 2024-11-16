import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-llm-suggestions',
  standalone: true,
  imports: [CommonModule, MatCardModule,MatExpansionModule],
  templateUrl: './llm-suggestions.component.html',
  styleUrls: ['./llm-suggestions.component.css']
})
export class LlmSuggestionsComponent {
  @Input() suggestions: any;

  ngOnChanges(): void {
    console.log(this.suggestions)
  }
/*   suggestions = [
    { cause: 'High Blood Pressure', symptoms: 'Headache, Dizziness, Blurred Vision' },
    { cause: 'Dehydration', symptoms: 'Fatigue, Dry Mouth, Thirst' },
    { cause: 'Stress', symptoms: 'Anxiety, Insomnia, Muscle Tension' }
  ]; */

}
