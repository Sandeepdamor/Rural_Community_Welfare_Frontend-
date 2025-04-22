import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatPaginatorModule } from '@angular/material/paginator';
import { GenderPipe } from '../shared/pipes/gender.pipe';
import { SarpanchRoutingModule } from './sarpanch-routing.module';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        SarpanchRoutingModule,
        MatPaginatorModule,
        GenderPipe


    ]
})
export class SarpanchModule { }
