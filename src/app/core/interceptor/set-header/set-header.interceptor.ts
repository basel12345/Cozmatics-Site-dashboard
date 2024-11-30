// demo.interceptor.ts

import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { PLATFORM_ID, inject } from '@angular/core';

export const setHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  let authReq = req;
  const platformId: object = inject(PLATFORM_ID)
  if (isPlatformBrowser(platformId)) {
    const token = sessionStorage.getItem('token');
    if (token) {
      let tokenAuth = JSON.parse(token);
      authReq = req.clone({
        setHeaders: {
          "Accept-Language": `en`,
          "Authorization": `Bearer ${tokenAuth}`
        }
      });
    }
  }
  return next(authReq);
};