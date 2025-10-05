import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  getUserToken(){
    //TODO: Recuperar token do Localstorage
    return 'token_gerado_da_rota_de_login';
  }
}
