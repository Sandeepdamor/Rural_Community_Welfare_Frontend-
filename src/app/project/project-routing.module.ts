import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentRoutes } from '../shared/utils/component-routes';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { PendingRejectedProjectListComponent } from './components/pending-rejected-project-list/pending-rejected-project-list.component';

const routes: Routes = [
  {
    path: ComponentRoutes.PROJECTLIST,
    component: ProjectListComponent,
  },
  {
    path: ComponentRoutes.PROJECTADD,
    component: AddProjectComponent,
  },
  { 
    path: ':id/edit', 
    component: AddProjectComponent 
  },
  { 
    path: ':id/view', 
    component: AddProjectComponent 
  },
  {
    path: ComponentRoutes.PENDING_REJECT_PROJECT_LIST,
    component: PendingRejectedProjectListComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule {}
