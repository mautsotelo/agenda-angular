import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Dish } from './dish';

@Component({
  selector: 'app-dish',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatSlideToggleModule ],
  styleUrls: ['./dish.component.css'],
  templateUrl: './dish.component.html'
})
export class DishComponent {
  @Input() dish!: Dish;

}
