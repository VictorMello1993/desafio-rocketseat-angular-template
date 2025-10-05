import { HttpInterceptorFn } from '@angular/common/http';
import { UserAuthService } from '../services/user-auth';
import { inject } from '@angular/core';

/**
 * Interceptor responsável por adicionar um token JWT automaticamente no header da requisição (Authorization)
 * @param req requisição atual
 * @param next responsável por prosseguir a requisição de uma rota
 * @returns uma nova requisição que será disparada na rota alvo
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const _userAuthService = inject(UserAuthService);
  const token = _userAuthService.getUserToken()

  if(token){
    const newReq = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${token}`)
    });
    return next(newReq);
  }

  return next(req);
};
