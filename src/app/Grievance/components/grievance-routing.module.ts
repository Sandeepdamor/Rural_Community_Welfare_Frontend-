import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentRoutes } from '../../shared/utils/component-routes';
import { GrievanceListComponent } from './grievance-list/grievance-list.component';
import { GrievanceUpdateComponent } from './grievance-update/grievance-update.component';

const routes: Routes = [
  {
    path: ComponentRoutes.GRIEVANCELIST,
    component: GrievanceListComponent,
  },
  {
    path: ComponentRoutes.GRIEVANCEUPDATE,
    component: GrievanceUpdateComponent,
  },

  {
    path: 'grievance/grievance-update',
    component: GrievanceUpdateComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrievanceRoutingModule {}
