import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ErrorService } from '../services/error.service';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorService = inject(ErrorService);  // Inject ErrorService

  return next(req).pipe(
    catchError((error) => {
      // Handle the error using your ErrorService
      errorService.handleError(error);  // Log or process the error

      // Propagate the error to other parts of the app
      return throwError(() => error);  // Propagate the error after handling
    })
  );
};
