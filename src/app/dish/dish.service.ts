import { Injectable } from '@angular/core';
import { Dish } from './dish';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  url = 'http://localhost:3000/dishes';

  constructor() { }

  async getAllDishes(): Promise<Dish[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }
  
  async getDishByID(id: string): Promise<Dish> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json();
  }

  async createDish(dish: Dish): Promise<Dish> {
    const options = {
      method: "POST",
      headers: {
       "Content-Type": "application/json"
      },
      body: JSON.stringify(dish)
    }
    const data = await fetch(this.url, options);
    return await data.json();
  }

  async editDish(dish: Dish): Promise<Dish> {
    const options = {
      method: "PUT",
      headers: {
       "Content-Type": "application/json"
      },
      body: JSON.stringify(dish)
    }
    const data = await fetch(`${this.url}/${dish.id}`, options);
    return await data.json();
  }

  async deleteDish(id: string): Promise<Dish> {
    const options = {
      method: "DELETE"
    }

    const data = await fetch(`${this.url}/${id}`, options);
    return await data.json();
  } 
}