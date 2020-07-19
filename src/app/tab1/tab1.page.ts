import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  title = "Grocery List";

  items = [
    {
      name: "Milk",
      quantity: 1
    },
    {
      name: "Bread",
      quantity: 2
    },
    {
      name: "Bannana",
      quantity: 3
    },
    {
      name: "Sugar",
      quantity: 1
    }
  ];

  constructor(public toastController: ToastController, public alertController: AlertController) {}

  async presentToast(toastMessage) {
    const toast = await this.toastController.create({
      message: toastMessage,
      duration: 3000,
      position: "bottom"
    });
    toast.present();
  }

  async presentAlertPrompt() {
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
            this.items.push(item)

            let message: string = `Item ${item.name} was added......`;
            this.presentToast(message);
          }
        }
      ]
    });

    await alert.present();
  }

  removeItem(item, index) {
    this.items.splice(index, 1)

    let message: string = `Item ${index} was deleted......`;
    this.presentToast(message);
  }

  addItem(){
    this.presentAlertPrompt();
  }
}
