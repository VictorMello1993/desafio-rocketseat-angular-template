import { HttpInterceptorFn } from '@angular/common/http';
import { UserAuthService } from '../services/user-auth';
import { inject } from '@angular/core';

/**
 * Interceptor responsável por validar um token antes de prosseguir na requisição de uma rota
 * @param req requisição atual
 * @param next responsável por prosseguir a requisição de uma rota
 * @returns uma nova requisição que será disparada na rota alvo
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const _userAuthService = inject(UserAuthService);
  const HAS_TOKEN = _userAuthService.getUserToken()

  if(HAS_TOKEN){
    const newReq = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${HAS_TOKEN}`)
    });
    return next(newReq);
  }

  return next(req);
};
