import { Component } from '@angular/core';

import { GroceriesService } from '../groceries.service';
import { PopupService } from '../popup.service';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private  groceries:GroceriesService, private popup: PopupService, private socialSharing: SocialSharing) {
    groceries.loadItems();
  }

  getItems() {
    return this.groceries.getItems();
  }
  
  noItems() {
    return this.getItems().length === 0;
  }

  removeItem(index) {
    this.groceries.deletItem(index);

    let message: string = `Grocery Item ${index} was deleted.`;
    //this.feedback.presentToast(message);
  }

  addItem(){
    this.popup.presentAlertPrompt();
  }

  editItem(item, index) {
    this.popup.presentAlertPrompt(item, index);
  }

  shareItem(){
        // Check if sharing via email is supported
        this.socialSharing.canShareViaEmail().then(() => {
          // Sharing via email is possible
    
          // Share via email
          this.socialSharing.shareViaEmail('Body', 'Subject', ['dakoatatyson@gmail.com']).then(() => {
            //this.feedback.presentToast(`You have shared a Grocery Item with {email here}.`);
          }).catch(() => {
            //this.feedback.presentErrorToast(`Could not send email to {email here}.`);
          });
        }).catch(() => {
          //this.feedback.presentErrorToast(`Email can not be esnt.`);
        });
  }
}
