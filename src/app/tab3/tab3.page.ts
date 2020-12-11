import { Component, OnInit } from '@angular/core';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { Usuario } from '../model/usuario';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page implements OnInit{
  usuario:Usuario;
  
  constructor(
    private flashlight: Flashlight,
    private authS: AuthService,
    private router: Router) {
      this.usuario = authS.user;
    }

  ngOnInit(): void {
    //
  }

  public luz(){
    if (this.flashlight.isSwitchedOn()) {
      
      this.flashlight.switchOff()
    }else{
      this.flashlight.switchOn()
    }
  }

  //__________________________________________________________CerrarSesón
  public async logout() {
    await this.authS.logout();
    if (!this.authS.isLogged()) {
      this.router.navigate(['/login'])
    }
  }
  //__________________________________________________________CerrarSesón
  
}
