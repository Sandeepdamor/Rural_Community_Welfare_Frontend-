import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LocalEventsRoutingModule } from './local-events-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatPaginatorModule, LocalEventsRoutingModule],
})
export class LocalEventsModule {} //  Rename this to GrievanceModule (not GrievanceRoutingModule)
