import { Injectable } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';

@Injectable({
  providedIn: 'root'
})
export class ReproNotasService {

  constructor(private rpnotas: TextToSpeech) {}

  talk(text){
    return this.rpnotas.speak({
      text: text,
      locale: 'es-ES',
      rate: 1 //VELOCIDAD DE REPRODUCCIÓN
    })
    .then(() => console.log("Reproducido"))
    .catch((failed:any) => console.log(failed));
  }
}
