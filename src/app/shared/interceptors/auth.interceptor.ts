import { HttpInterceptorFn } from '@angular/common/http';


/**
 * AuthInterceptor - Automatically adds Authorization token to every HTTP request
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 🔹 Check for accessToken first; if not found, use authToken
  const authToken = localStorage.getItem('accessToken') || localStorage.getItem('authToken');
  console.log('Token in Interceptor => ', authToken);
  // ✅ If token exists, clone the request and add Authorization header
  if (authToken) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}` // 🔐 Attaching token in request header
      }
    });

    console.log('🔍 Intercepted Request with Token:', clonedRequest);
    return next(clonedRequest); // ⏭ Forward modified request
  }

  // ❌ If no token is found, send the request without modification
  console.warn('⚠ No auth token found, sending request without authentication.');
  return next(req);
};
