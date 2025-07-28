import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { GenderPipe } from './pipes/gender.pipe';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedRoutingModule,
    BrowserModule,
    FormsModule,
    MatRadioModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    GenderPipe
  ],
})
export class SharedModule {}
