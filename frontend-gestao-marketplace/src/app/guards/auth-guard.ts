import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user';
import { UserAuthService } from '../services/user-auth';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async (route, state) => {
  const _userService = inject(UserService);
  const _userAuthService = inject(UserAuthService);
  const _router = inject(Router);

  //Recupera o token do localstorage
  const HAS_TOKEN = _userAuthService.getUserToken();

  if(!HAS_TOKEN){
    return _router.navigate(['/login'])
  }

  try {
    //Valida o token no backend
    await firstValueFrom(_userService.validadeUser());

    /*Se o usuário está validado e a rota que ele está tentando acessar corresponde à rota de login,
      será direcionado para a página de produtos*/
    // if(state.url === '/login'){
    //   return _router.navigate(['/products']);
    // }

    //Se o token é válido e a rota não é de login, permite o acesso para a rota desejada
    return true;

  } catch (error) {
    //Se a requisição de validação falhar (token inválido), redirecionar para a página de login
    return _router.navigate(['/products']);
  }
};
