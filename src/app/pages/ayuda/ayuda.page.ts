import { Component, Input, OnInit } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-nota',
  templateUrl: './ayuda.page.html',
  styleUrls: ['./ayuda.page.scss'],
})
export class AyudaPage implements OnInit {
  text: string;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  public salir() {
    this.modalController.dismiss();
  }
}
