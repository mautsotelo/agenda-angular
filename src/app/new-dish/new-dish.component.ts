import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Dish } from '../dish/dish';
import { DishService } from '../dish/dish.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-dish',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule, ReactiveFormsModule],
  styleUrls: ['./new-dish.component.css'],
  templateUrl: './new-dish.component.html',
})
export class NewDishComponent {
  @Output() closeEvent = new EventEmitter<boolean>();
  @Output() refreshEvent = new EventEmitter<boolean>();

  dishService: DishService = inject(DishService);
  
  dishForm = new FormGroup({
    id: new FormControl(Date.now().toString()),
    name: new FormControl(''),
    photo: new FormControl(''),
    price: new FormControl(0),
    description: new FormControl('')
  });

  close() {
    this.closeEvent.emit(false);
  }

  addNewDish() {
    this.dishService.createDish({
      id: this.dishForm.value.id as string,
      name: this.dishForm.value.name as string,
      photo: this.dishForm.value.photo as string,
      description: this.dishForm.value.description as string,
      price: this.dishForm.value.price as number
    }).then(resp => {
      this.close();
      this.refreshEvent.emit(true);
    })
  }
}
