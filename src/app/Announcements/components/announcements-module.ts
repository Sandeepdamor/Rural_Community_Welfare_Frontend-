import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatPaginatorModule } from '@angular/material/paginator';
import { AnnouncementRoutingModule } from './announcements-routing.module';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        AnnouncementRoutingModule,
        MatPaginatorModule
    ]
})
export class AnnouncementModule { }
