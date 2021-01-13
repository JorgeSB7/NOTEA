import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  constructor(private geolocation: Geolocation) {

  }

  async getPosition(){
    return this.geolocation.getCurrentPosition();
  }
}
