import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentRoutes } from './utils/component-routes';
import { ProfileComponent } from '../profile/components/profile/profile.component';

const routes: Routes = [
  {
    path: ComponentRoutes.PROFILE,
    loadChildren: () =>
      import('../../app/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'profile/:type/:id',
    component: ProfileComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedRoutingModule { }
