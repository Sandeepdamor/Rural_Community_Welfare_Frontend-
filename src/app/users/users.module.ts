import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { GenderPipe } from '../shared/pipes/gender.pipe';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatPaginatorModule,
    GenderPipe
  ]
})
export class UsersModule { }
