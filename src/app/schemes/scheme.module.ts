import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ReasonDialogComponent } from "../shared/components/reason-dialog/reason-dialog.component";
import { SchemesRoutingModule } from "./scheme-routing.module";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      SchemesRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      ReasonDialogComponent
    ],
  })
  export class SchemesModule {}