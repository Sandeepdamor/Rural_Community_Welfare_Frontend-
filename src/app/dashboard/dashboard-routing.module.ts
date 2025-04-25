import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentRoutes } from '../shared/utils/component-routes';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path:ComponentRoutes.HOME,
    redirectTo:ComponentRoutes.DASHBOARD,
    pathMatch:'full'
  },
  {
    path: ComponentRoutes.DASHBOARD,
    component: DashboardComponent,

  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
