import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { Nota } from '../model/nota';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NotasService } from '../services/notas.service';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { UbicacionService } from '../services/ubicacion.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public task: FormGroup;
  latitude = 0;
  longitude = 0;

  constructor(private formBuilder: FormBuilder,
    private flashlight: Flashlight,
    private notasS: NotasService,
    private authS: AuthService,
    private router: Router,
    public toastS: ToastService,
    public ubiS: UbicacionService) {
    this.task = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''], date: ['']
    })
  }

  //__________________________________________________________GUARDAR NOTA
  public async sendForm() {
    await this.toastS.presentLoading();
    let data: Nota = {
      titulo: this.task.get('title').value,
      texto: this.task.get('description').value,
      fecha: this.task.get('date').value
    }

    this.notasS.agregaNota(data).then((respuesta) => {
      this.task.setValue({
        title: '',
        description: '',
        date: ''
      })
      //_______________________TOAST NOTA GUARDADA
      this.toastS.loadingController.dismiss();
      this.toastS.presentToast("Nota Guardada", "success");
    }).catch((err) => {
      this.toastS.loadingController.dismiss();
      this.toastS.presentToast("Error guardando nota", "danger");
    })
  }
  //__________________________________________________________GUARDAR NOTA

  //__________________________________________________________LINTERNA
  public luz() {
    if (this.flashlight.isSwitchedOn()) {

      this.flashlight.switchOff()
    } else {
      this.flashlight.switchOn()
    }
  }
  //__________________________________________________________LINTERNA

  //__________________________________________________________UBICACIÓN
  public async sendUbi() {
    await this.toastS.presentLoading();


    await this.ubiS.getPosition().then((resp) => {
      this.latitude=resp.coords.latitude
      this.longitude=resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);});
    
    
    let data: Nota = {
      titulo: this.task.get('title').value,
      texto: this.task.get('description').value,
      fecha: this.task.get('date').value,
      latitude: this.latitude,
      longitude: this.longitude
    }

    this.notasS.agregaNota(data).then((respuesta) => {
      this.task.setValue({
        title: '',
        description: '',
        date: '',
        latitude: '',
        longitude: '',
      })
      //_______________________TOAST UBICACIÓN GUARDADA
      this.toastS.loadingController.dismiss();
      this.toastS.presentToast("Nota Guardada", "success");
    }).catch((err) => {
      this.toastS.loadingController.dismiss();
      this.toastS.presentToast("Nota Guardada", "success");
    })
  }
  //__________________________________________________________UBICACIÓN
}
