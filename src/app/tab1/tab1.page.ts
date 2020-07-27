import { Component } from '@angular/core';
import { GroceriesService } from '../groceries.service';
import { ToastService } from '../toast.service';
import { InputDialogService } from '../input-dialog.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  title = "Grocery List";

  constructor(public groceries:GroceriesService, public message: ToastService, public input: InputDialogService) {}

  loadItems() {
    return this.groceries.getItems();
  }
  
  noItems() {
    console.log(this.loadItems().length === 0);
    return this.loadItems().length === 0;
  }

  removeItem(item, index) {
    this.groceries.deletItem(index);

    let message: string = `Item ${item.name} was deleted......`;
    this.message.presentToast(message);
  }

  addItem(){
    this.input.presentAlertPrompt();
  }

  editItem(item, index) {
    this.input.presentAlertPrompt(item, index);
    
    let message: string = `Item ${item.name} was edited......`;
    this.message.presentToast(message);
  }
}
