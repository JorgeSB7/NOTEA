import { DOCUMENT } from '@angular/common';
import { Injectable, RendererFactory2, Inject, Renderer2 } from '@angular/core';

// NO SE ESTÁ HACIENDO USO DE ESTE SERVICIO

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  renderer: Renderer2;
  constructor(private rendererFactory: RendererFactory2, @Inject(DOCUMENT) private document: Document) { 
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  themeDark(){
    this.cleanLight();
    this.renderer.addClass(this.document.body, 'dark-theme');
  }

  themeMarvel(){
    this.cleanLight();
    this.renderer.addClass(this.document.body, 'marvel-theme');
  }

  themeNature(){
    this.cleanLight();
    this.renderer.addClass(this.document.body, 'nature-theme');
  }

  cleanLight(){
    this.renderer.removeClass(this.document.body, 'basic-theme');
    this.renderer.removeClass(this.document.body, 'dark-theme');
    this.renderer.removeClass(this.document.body, 'marvel-theme');
    this.renderer.removeClass(this.document.body, 'nature-theme');
  }

}
