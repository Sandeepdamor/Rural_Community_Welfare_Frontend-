import { CommonModule } from '@angular/common';
import { Component,Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-message-dailog',
  imports: [MatIconModule,CommonModule,MatDialogModule,
    MatButtonModule],
  templateUrl: './message-dailog.component.html',
  styleUrl: './message-dailog.component.scss'
})
export class MessageDailogComponent {

  constructor(
    public dialogRef: MatDialogRef<MessageDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string; type: 'success' | 'error' | 'info'; title?: string }
  ) { }

  onClose(): void {
    this.dialogRef.close();
  }
}
