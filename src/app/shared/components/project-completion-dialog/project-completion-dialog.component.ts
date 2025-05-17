import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-project-completion-dialog',
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule,MatButtonModule],
  templateUrl: './project-completion-dialog.component.html',
  styleUrl: './project-completion-dialog.component.scss'
})
export class ProjectCompletionDialogComponent {
   expenditureAmount: number | null = null;
  file: File | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { budget: number },
    private dialogRef: MatDialogRef<ProjectCompletionDialogComponent>
  ) {}

  onFileChange(event: any): void {
    this.file = event.target.files[0];
  }

  submit(): void {
    if (this.expenditureAmount == null || this.expenditureAmount < 0) {
      alert('Please enter a valid expenditure amount.');
      return;
    }
    this.dialogRef.close({ expenditureAmount: this.expenditureAmount, file: this.file });
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
