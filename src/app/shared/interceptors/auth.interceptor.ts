import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { TokenService } from '../services/token.service';
import { UserService } from '../services/user.service';

/**
 * AuthInterceptor - Automatically adds Authorization token to every HTTP request
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const userService = inject(UserService);
  const router = inject(Router);
  // 🔹 Check for accessToken first; if not found, use authToken
  const authToken =
    localStorage.getItem('accessToken') || localStorage.getItem('authToken');
  console.log('Token in Interceptor => ', authToken);
  // ✅ If token exists, clone the request and add Authorization header
  if (authToken) {
    const mobile =
      tokenService.getMobileNumberFromAccessToken() ||
      tokenService.getMobileNumberFromAuthToken();

    if (!mobile) {
      alert('❌ Invalid token: Mobile number not found');
      router.navigate(['/']);
      return throwError(
        () => new Error('Invalid token - mobile number missing')
      );
    }

    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`, // 🔐 Attaching token in request header
      },
    });

    console.log('🔍 Intercepted Request with Token:', clonedRequest);
    return next(clonedRequest); // ⏭ Forward modified request
  }

  // ❌ If no token is found, send the request without modification
  console.warn(
    '⚠ No auth token found, sending request without authentication.'
  );
  return next(req);
};
