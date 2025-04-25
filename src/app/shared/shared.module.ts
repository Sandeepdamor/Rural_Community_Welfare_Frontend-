import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { GenderPipe } from './pipes/gender.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MessageDailogComponent } from './components/message-dailog/message-dailog.component';

@NgModule({
  declarations: [MessageDailogComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    BrowserModule,
    FormsModule,
    MatRadioModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    GenderPipe,
    MatDialogModule,
    MatIconModule,
  
  ],
})
export class SharedModule {}
