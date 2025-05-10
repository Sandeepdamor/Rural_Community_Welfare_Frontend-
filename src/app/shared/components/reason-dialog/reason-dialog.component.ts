import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-reason-dialog',
  imports: [CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,],
  templateUrl: './reason-dialog.component.html',
  styleUrl: './reason-dialog.component.scss'
})
export class ReasonDialogComponent {
  reason: string = '';
  errorMessage: string = '';

  constructor(
    public dialogRef: MatDialogRef<ReasonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { status: string }
  ) {}

  submit() {
    if (this.reason.trim().length > 0) {
      this.dialogRef.close(this.reason.trim());
    } else {
      this.errorMessage = 'FeedBack/Response is required.';
      console.log('ERROR MESSAGE ==> ',this.errorMessage);
    }
  }

  cancel() {
    this.dialogRef.close(); // Let it close if you want to allow cancel (optional)
  }
}
