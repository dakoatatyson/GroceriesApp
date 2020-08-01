import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastController: ToastController) { }

  async presentToast(toastMessage) {
    const toast = await this.toastController.create({
      message: toastMessage,
      duration: 3000,
      position: "bottom",
      color: "success"
    });
    toast.present();
  }

  async presentErrorToast(toastMessage) {
    const toast = await this.toastController.create({
      message: toastMessage,
      duration: 3000,
      position: "bottom",
      color: "danger"
    });
    toast.present();
  }
}
