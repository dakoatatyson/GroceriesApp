import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CustomToastService {

  constructor(private toastController: ToastController) { }

  async presentToast(toastMessage) {
    const toast = await this.toastController.create({
      message: toastMessage,
      duration: 2000,
      position: "bottom",
      color: "primary"
    });
    toast.present();
  }

  async presentErrorToast(toastMessage) {
    const toast = await this.toastController.create({
      message: toastMessage,
      duration: 2000,
      position: "bottom",
      color: "danger"
    });
    toast.present();
  }
}
