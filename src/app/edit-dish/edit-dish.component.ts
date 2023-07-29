import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DishService } from '../dish/dish.service';
import { Dish } from '../dish/dish';

@Component({
  selector: 'app-edit-dish',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatInputModule, MatIconModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './edit-dish.component.html',
  styleUrls: ['./edit-dish.component.css']
})
export class EditDishComponent {
  @Input() dishID!: string;
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

  ngOnInit() {
    this.getDishToEdit();
  }

  getDishToEdit() {
    this.dishService.getDishByID(this.dishID).then(resp => {
      this.dishForm.get("id")?.setValue(resp.id)
      this.dishForm.get("name")?.setValue(resp.name)
      this.dishForm.get("photo")?.setValue(resp.photo)
      this.dishForm.get("price")?.setValue(resp.price)
      this.dishForm.get("description")?.setValue(resp.description)
    })
  }

  close() {
    this.closeEvent.emit(false);
  }

  editDish() {
    this.dishService.editDish({
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
