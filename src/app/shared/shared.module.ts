import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';
import { GenderPipe } from './pipes/gender.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MessageDailogComponent } from './components/message-dailog/message-dailog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReasonDialogComponent } from './components/reason-dialog/reason-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    MessageDailogComponent,
    ReasonDialogComponent,
    GenderPipe
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    MatRadioModule,
    MatPaginatorModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [
    MessageDailogComponent,
    ReasonDialogComponent,
    GenderPipe
  ]
})
export class SharedModule {}
