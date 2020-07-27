import { Injectable } from '@angular/core';
import { GroceriesService } from './groceries.service';
import { AlertController } from '@ionic/angular';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class InputDialogService {

  constructor( public message: ToastService, public alertController: AlertController, public groceries: GroceriesService) { }

  async presentAlertPrompt(item?, index?) {
    const alert = await this.alertController.create({
      cssClass: 'grocery-item-prompt',
      header: item? 'Edit Grocery Item' : 'Add Grocery Item',
      message: item? 'Edit the values for a Grocery Item....' : 'Enter the values for a new Grocery Item....',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name',
          value: item? item.name : null
        },
        {
          name: "quantity",
          type: "number",
          placeholder: "Quantity",
          value: item? item.quantity : null,
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
          text: item? 'Save' : 'Create',
          handler: newItem => {
            let message: string = "";
            if(item !== undefined)
            {
              this.groceries.editItem(newItem, index);
              message = `Item ${item.name} was edited......`;;
            }
            else
            {
              this.groceries.addItem(newItem);
              message = `Item ${newItem.name} was added......`;
            }
            this.message.presentToast(message);
          }
        }
      ]
    });

    await alert.present();
  }
}
