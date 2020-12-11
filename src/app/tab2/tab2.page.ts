import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { Nota } from '../model/nota';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NotasService } from '../services/notas.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public task: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private notasS: NotasService,
    private authS: AuthService,
    private router: Router,
    public loadingController: LoadingController,
    public toastController: ToastController) {
    this.task = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''], date: ['']
    })
  }

  public async sendForm() {
    await this.presentLoading();
    let data: Nota = {
      titulo: this.task.get('title').value,
      texto: this.task.get('description').value,
      fecha: this.task.get('date').value
    }

    this.notasS.agregaNota(data).then((respuesta) => {
      this.task.setValue({
        title: '',
        description: '',
        date:''
      })
      //_______________________TOAST NOTA GUARDADA
      this.loadingController.dismiss();
      this.presentToast("Nota Guardada", "success");
    }).catch((err) => {
      this.loadingController.dismiss();
      this.presentToast("Error guardando nota", "danger");
    })
  }

  //__________________________________________________________CerrarSesón
  public async logout() {
    await this.authS.logout();
    if (!this.authS.isLogged()) {
      this.router.navigate(['/login'])
    }
  }
  //__________________________________________________________CerrarSesón

  //__________________________________________________________TOAST
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: '',
      spinner: "crescent"
    });
    await loading.present();
  }
  async presentToast(msg: string, col: string) {
    const toast = await this.toastController.create({
      message: msg,
      color: col,
      duration: 2000,
      position: "top"
    });
    toast.present();
  }
  //__________________________________________________________TOAST
}
