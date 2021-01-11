import { Component, Input, OnInit } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { ModalController } from '@ionic/angular';
import { Nota } from 'src/app/model/nota';
import { ReproNotasService } from 'src/app/services/repro-notas.service';
import { Map, tileLayer, marker } from 'leaflet';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.page.html',
  styleUrls: ['./nota.page.scss'],
})
export class NotaPage implements OnInit {
  @Input("nota") nota: Nota;
  text: string;
  public newMarker: any;
  public showMap: boolean;
  public latitude = 0;
  public longitude = 0;
  public map: Map;

  constructor(private modalController: ModalController, private rpnotas: ReproNotasService) { }

  ngOnInit() {
    this.loadMap();
  }

  public salir() {
    this.modalController.dismiss();
  }

  repro(){
    this.text = this.nota.texto
    this.rpnotas.talk(this.text);
  }

  public loadMap() {
    this.latitude = this.nota.latitude;
    this.longitude = this.nota.longitude;
    if (this.longitude != null && this.latitude != null) {
      this.showMap = true;
      this.map = new Map("map").setView([this.latitude, this.longitude], 13);
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>' })
        .addTo(this.map);

      this.newMarker = marker([this.latitude, this.longitude], {
        draggable:
          true
      }).addTo(this.map);
      this.newMarker.bindPopup("Lugar guardado").openPopup();
      setTimeout(()=>{
        this.map.invalidateSize();
      }, 400);
    }
  }
}