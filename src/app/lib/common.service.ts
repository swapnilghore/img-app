import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  isToastVisible: boolean = false;


  constructor(private loadingController: LoadingController,private toastController: ToastController,) { }

  async presentLoader(): Promise<HTMLIonLoadingElement> {
    return await this.loadingController.create({
      mode: 'ios',
      message: 'Loading...',
      spinner: 'circles',
      animated: true
    })
  }

  async success(msg: string) {
    this.isToastVisible = true;
    const toast = await this.toastController.create({
      message: msg,
      duration: 5000,
      color: 'success',
      cssClass: 'iontoast',
      position: 'bottom',
    });
    toast.present();
    toast.onDidDismiss().then((data) => {
      this.isToastVisible = false;
    })
  }

  async danger(msg: string) {
    this.isToastVisible = true;
    const toast = await this.toastController.create({
      message: msg,
      duration: 5000,
      color: 'danger',
      cssClass: 'iontoast',
      position: 'bottom',
    });
    toast.present();
    toast.onDidDismiss().then((data) => {
      this.isToastVisible = false;
    })
  }
}
