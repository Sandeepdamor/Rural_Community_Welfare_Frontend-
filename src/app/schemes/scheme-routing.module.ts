import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ComponentRoutes } from "../shared/utils/component-routes";
import { SchemesListComponent } from "./components/schemes-list/schemes-list.component";
import { AddSchemeComponent } from "./components/add-scheme/add-scheme.component";
import { DeleteListComponent } from "./components/delete-list/delete-list.component";

const routes: Routes = [
    {
        path: ComponentRoutes.SCHEMES,
        component: SchemesListComponent,
    },
    {
        path: ComponentRoutes.SCHEMESLIST,
        component: SchemesListComponent,
    },
    {
        path: ComponentRoutes.SCHEMEADD,
        component: AddSchemeComponent,
    },
    {
        path: ComponentRoutes.DELETESCHEMESLIST,
        component: DeleteListComponent,
    },
   {
  path: 'edit/:id',
  component: AddSchemeComponent,
  data: { mode: 'edit' }
},
{
  path: 'view/:id',
  component: AddSchemeComponent,
  data: { mode: 'view' }
}

    // { 
    //   path: ':id/edit', 
    //   component: AddProjectComponent 
    // },
    // { 
    //   path: ':id/view', 
    //   component: AddProjectComponent 
    // },
    // {
    //   path: ComponentRoutes.PENDING_REJECT_PROJECT_LIST,
    //   component: PendingRejectedProjectListComponent,
    // },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SchemesRoutingModule { }
