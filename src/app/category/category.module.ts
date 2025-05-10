import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatPaginatorModule } from "@angular/material/paginator";
import { GenderPipe } from "../shared/pipes/gender.pipe";
import { CategoryRoutingModule } from "./category-routing.module";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        CategoryRoutingModule,
        MatPaginatorModule,
        GenderPipe


    ]
})
export class CategoryModule { }
