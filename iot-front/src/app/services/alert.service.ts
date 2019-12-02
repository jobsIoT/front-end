import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AlertService {



  constructor(private toastController: ToastController) { }
  async presentToast(message: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
      color: 'light'
    });
    toast.present();
  }
  
}
