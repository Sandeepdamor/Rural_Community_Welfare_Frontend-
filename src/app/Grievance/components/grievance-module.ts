import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { GrievanceRoutingModule } from './grievance-routing.module'; //  Make sure this import is active and correct

@NgModule({
  declarations: [],
  imports: [CommonModule, MatPaginatorModule, GrievanceRoutingModule],
})
export class GrievanceModule {} //  Rename this to GrievanceModule (not GrievanceRoutingModule)
