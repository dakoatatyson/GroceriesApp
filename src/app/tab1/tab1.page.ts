import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { GroceriesService } from '../groceries.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  title = "Grocery List";

  constructor(public toastController: ToastController, public alertController: AlertController, public groceries:GroceriesService) {}

  loadItems() {
    return this.groceries.getItems();
  }
  
  noItems() {
    console.log(this.loadItems().length === 0);
    return this.loadItems().length === 0;
  }

  async presentToast(toastMessage) {
    const toast = await this.toastController.create({
      message: toastMessage,
      duration: 3000,
      position: "bottom"
    });
    toast.present();
  }

  async presentAddAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'grocery-item-prompt',
      header: 'Add Grocery Item',
      message: "Enter the values for a new Grocery Item....",
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name'
        },
        {
          name: "quantity",
          type: "number",
          placeholder: "Quantity",
          min: 1
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            
          }
        }, {
          text: 'Ok',
          handler: item => {
            this.groceries.addItem(item);

            let message: string = `Item ${item.name} was added......`;
            this.presentToast(message);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentEditAlertPrompt(item, index) {
    const alert = await this.alertController.create({
      cssClass: 'grocery-item-prompt',
      header: 'Edit Grocery Item',
      message: "Edit the values for a Grocery Item....",
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name',
          value: item.name
        },
        {
          name: "quantity",
          type: "number",
          placeholder: "Quantity",
          value: item.quantity,
          min: 1
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            
          }
        }, {
          text: 'Ok',
          handler: item => {
            this.groceries.editItem(item, index);
          }
        }
      ]
    });

    await alert.present();
  }

  removeItem(item, index) {
    this.groceries.deletItem(index);

    let message: string = `Item ${item.name} was deleted......`;
    this.presentToast(message);
  }

  addItem(){
    this.presentAddAlertPrompt();
  }

  editItem(item, index) {
    this.presentEditAlertPrompt(item, index);
    
    let message: string = `Item ${item.name} was edited......`;
    this.presentToast(message);
  }
}
