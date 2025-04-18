import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentRoutes } from '../shared/utils/component-routes';
import { RoleListComponent } from './components/role-list/role-list.component';
import { UpdateRoleComponent } from './components/update-role/update-role.component';

const routes: Routes = [
  {
    path: '',
    component:RoleListComponent
  },
  {
    path: ComponentRoutes.MANAGEROLELIST,
    component: RoleListComponent,
  },
  {
    path: ComponentRoutes.MANAGEROLEADD,
    component: UpdateRoleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageRolesRoutingModule {}
