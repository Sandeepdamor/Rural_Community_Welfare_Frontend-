import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../shared/services/token.service';
import { inject } from '@angular/core';
import { ComponentRoutes } from '../shared/utils/component-routes';

export const authGuard: CanActivateFn = (route, state) => {

  const tokenService = inject(TokenService);
  const router = inject(Router);

  const token = tokenService.getAccessToken();
  const isExpired = tokenService.isTokenExpired();
  const role = tokenService.getRoleFromToken();
  console.log('AUTH GUARD => Token:', token, 'Role:', role);

  // ✅ Allow unauthenticated users to access Login & Auth-related pages
  const publicRoutes = [
    ComponentRoutes.USERAUTH, // '/login'
    ComponentRoutes.FORGOTPASSWORD, // '/forgot-password'
    ComponentRoutes.VERIFYOTP, // '/verify-otp'
    ComponentRoutes.NEWPASSWORD, // '/new-password'
  ];

  if (!token || isExpired) {
    const isPublic = publicRoutes.includes(state.url.replace('/', ''));
    if (isPublic || state.url === '/' || state.url === '') {
      return true; // allow unauthenticated access to public/login
    }
    router.navigate([ComponentRoutes.USERAUTH]);
    return false;
  }


  // ✅ If user is authenticated and visiting login path, redirect to dashboard
  if (token && state.url.startsWith('/login')) {
    console.log('User already logged in. Redirecting to dashboard...');
    router.navigate([`/${ComponentRoutes.DASHBOARD}`], { replaceUrl: true });
    return false;
  }

  return true; // ✅ Allow access to other routes
};
