import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-llm-suggestions',
  standalone: true,
  imports: [CommonModule, MatCardModule,MatExpansionModule, MatDividerModule],
  templateUrl: './llm-suggestions.component.html',
  styleUrls: ['./llm-suggestions.component.css']
})
export class LlmSuggestionsComponent {
  @Input() suggestions: any;
}
