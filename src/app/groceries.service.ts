import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Injectable({
  providedIn: 'root'
})
export class GroceriesService {
  items = [];

  constructor(public message: ToastService, private emailComposer: EmailComposer) { }

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

  shareItem(index){
    let item = this.items[index];
    let message: string = '';
    
    let email = {
      to: 'dakoatatyson@gmail.com',
      subject: 'Cordova Icons',
      body: 'How are you? Nice greetings from Leipzig',
    }

    // Send a text message using default options
    this.emailComposer.open(email);

    this.message.presentToast(message);
  }
}
