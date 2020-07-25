import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroceriesService {
  items = [];

  constructor() { }

  getItems() {
    return this.items;
  }

  addItem(item) {
    this.items.push(item)
  }

  editItem(item, index) {
    this.items[index] = item;
  }

  deletItem(index) {
    this.items.splice(index, 1);
  }
}
