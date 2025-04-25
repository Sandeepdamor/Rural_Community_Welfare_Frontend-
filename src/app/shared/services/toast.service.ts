import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageDailogComponent } from '../components/message-dailog/message-dailog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private dialog: MatDialog) { }

  // Show success message
  showSuccess(message: string, title: string = 'Success'): void {
    this.openDialog(message, 'success', title);
  }

  // Show error message
  showError(message: string, title: string = 'Error'): void {
    this.openDialog(message, 'error', title);
  }

  // Show info message
  showInfo(message: string, title: string = 'Info'): void {
    this.openDialog(message, 'info', title);
  }

  // Open the message dialog
  private openDialog(message: string, type: 'success' | 'error' | 'info', title: string): void {
    this.dialog.open(MessageDailogComponent, {
      data: {
        message: message,
        type: type,
        title: title
      },
      width: '400px', // Dialog width
    });
  }
}
