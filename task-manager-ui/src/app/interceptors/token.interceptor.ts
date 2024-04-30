import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = window.localStorage.getItem('token');
  
  const authReq = req.clone({ headers: req.headers.set('Authorization', `bearer ${token}`)});

  return next(authReq);
};
