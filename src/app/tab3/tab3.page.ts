import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/usuario';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ThemeService } from '../services/theme.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../services/language.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page implements OnInit {
  usuario: Usuario;
  themeMode = -1;
  lng:any;

  constructor(
    private authS: AuthService,
    private router: Router,
    private theme: ThemeService,
    private translate: TranslateService,
    private language: LanguageService) {
    this.usuario = authS.user;
  }

  ngOnInit(): void {
    //
  }

  //__________________________________________________________CerrarSesón
  public async logout() {
    await this.authS.logout();
    if (!this.authS.isLogged()) {
      this.router.navigate(['/login'])
    }
  }
  //__________________________________________________________CerrarSesón

  //__________________________________________________________Servicio de temas (No utilizado)
  /*
  enablecleanLight(){
    this.theme.cleanLight();
  }
  enableDark(){
    this.theme.themeDark();
  }
  enableMarvel(){
    this.theme.themeMarvel();
  }
  enableNature(){
    this.theme.themeNature();
  }
  */

  //__________________________________________________________Temas
  changeTheme($event, mode) {
    console.log($event);
    this.themeMode = mode;
    if ($event.detail.checked) {
      switch (mode) {
        case 0:
          document.body.classList.toggle('dark-theme');
          break;
        case 1:
          document.body.classList.toggle('marvel-theme');
          break;
        case 2:
          document.body.classList.toggle('nature-theme');
          break;
      }
    } else {
      this.themeMode = -1;
      document.body.classList.remove('dark-theme');
      document.body.classList.remove('marvel-theme');
      document.body.classList.remove('nature-theme');
    }

  }
  //__________________________________________________________Temas

  //__________________________________________________________Cambiar idioma
  changeLng($event) {
    this.language.setLanguage($event.target.value);
    console.log($event.target.value);
  }
  //__________________________________________________________Cambiar idioma
}
