import { Injectable } from '@angular/core';
import { ErrorResponse } from '../interfaces/error/error-response';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  handleError(error: any) {
    const errorResponse: ErrorResponse = {
      status: error.status,
      message: error.message || 'Something went wrong!',
      date: new Date().toISOString(),
      details: this.getCustomMessage(error)
    };

    console.error('Handled Error:', errorResponse);
    return throwError(() => errorResponse);
  }

  private getCustomMessage(error: any): string {
    if (!error || !error.status) return 'Unknown error occurred.';

    switch (error.status) {
      case 400:
        return error.error?.details || 'Bad Request - Please check your input.';
      case 401:
        return 'Unauthorized - Please login again.';
      case 403:
        return 'Forbidden - You don\'t have permission.';
      case 404:
        return 'Not Found - The resource doesn\'t exist.';
      case 500:
        return 'Internal Server Error - Try again later.';
      default:
        return error.error?.details || 'Something went wrong.';
    }
  }

}
