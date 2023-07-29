import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Dish } from './dish';
import { DishService } from './dish.service';

@Component({
  selector: 'app-dish',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatSlideToggleModule ],
  styleUrls: ['./dish.component.css'],
  templateUrl: './dish.component.html'
})
export class DishComponent {
  @Input() dish!: Dish;
  @Output() refreshEvent = new EventEmitter<boolean>();
  @Output() editEvent = new EventEmitter<string>();
  
  dishService: DishService = inject(DishService);

  deleteItem(id: string) {
    this.dishService.deleteDish(id).then(resp => {
      this.refreshEvent.emit(true);
    })
  }

  editItem(id: string) {
    console.log("dish", id)
    this.editEvent.emit(id);
  }
}
