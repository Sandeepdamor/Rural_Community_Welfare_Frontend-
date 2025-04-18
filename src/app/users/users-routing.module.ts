import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentRoutes } from '../shared/utils/component-routes';
import { UserListComponent } from './components/user-list/user-list.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { PendingUserListComponent } from './components/pending-user-list/pending-user-list.component';
import { BlockUserListComponent } from './components/block-user-list/block-user-list.component';
import { ProfileComponent } from '../profile/components/profile/profile.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: ComponentRoutes.USERLIST,
  //   pathMatch: 'full',
  // },
  {
    path: ComponentRoutes.USERLIST,
    component: UserListComponent,
  },
  {
    path: ComponentRoutes.USERADD,
    component: AddUserComponent,
  },
  { 
    path: 'profile/:id', 
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
export class UsersRoutingModule {}
