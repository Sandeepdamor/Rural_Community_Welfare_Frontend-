import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentRoutes } from '../shared/utils/component-routes';
import { ProfileComponent } from '../profile/components/profile/profile.component';
import { SarpanchListComponent } from './componenets/sarpanch-list/sarpanch-list.component';
import { AddUserComponent } from '../users/components/add-user/add-user.component';
import { PendingUserListComponent } from '../users/components/pending-user-list/pending-user-list.component';
import { BlockUserListComponent } from '../users/components/block-user-list/block-user-list.component';
import { AddSarpanchComponent } from './componenets/add-sarpanch/add-sarpanch.component';

const routes: Routes = [
  {
    path: ComponentRoutes.SARPANCHLIST,
    component: SarpanchListComponent,
  },
  {
    path: ComponentRoutes.SARPANCHADD,
    component: AddSarpanchComponent,
  },
  { 
    path: 'profile/:type/:id', 
    component: ProfileComponent 
  },
  {
    path: ComponentRoutes.AADHAR_PENDING_USER,
    component: PendingUserListComponent
  },
  {
    path: ComponentRoutes.DELETEUSERLIST,
    component: BlockUserListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SarpanchRoutingModule {}
