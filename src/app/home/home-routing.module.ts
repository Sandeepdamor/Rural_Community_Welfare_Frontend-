import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentRoutes } from '../shared/utils/component-routes';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from '../shared/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: ComponentRoutes.NOTFOUND,
    component: NotFoundComponent
  },
  {
    path: ComponentRoutes.HOME,
    component: HomeComponent,
    children: [
      {
        path: ComponentRoutes.HOME,
        loadChildren: () =>
          import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: ComponentRoutes.USER,
        loadChildren: () =>
          import('../users/users.module').then((m) => m.UsersModule),
      },
      {
        path: ComponentRoutes.PROFILE,
        loadChildren: () =>
          import('../profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: ComponentRoutes.SARPANCH,
        loadChildren: () =>
          import('../sarpanch/sarpanch.module').then((m) => m.SarpanchModule),
      },
      {
        path: ComponentRoutes.PROJECT,
        loadChildren: () =>
          import('../project/project.module').then((m) => m.ProjectModule),
      },

      {
        path: ComponentRoutes.CUSTOMER,
        loadChildren: () =>
          import('../customer/customer.module').then((m) => m.CustomerModule),
      },
      {
        path: ComponentRoutes.VENDOR,
        loadChildren: () =>
          import('../vendor/vendor.module').then((m) => m.VendorModule),
      },
      {
        path: ComponentRoutes.MANAGEROLE,
        loadChildren: () =>
          import('../manage-roles/manage-roles.module').then((m) => m.ManageRolesModule),
      },
      {
        path: ComponentRoutes.SERVICECETEGORY,
        loadChildren: () =>
          import('../service-category/service-category.module').then((m) => m.ServiceCategoryModule),
      },
      {
        path: ComponentRoutes.BOOKING,
        loadChildren: () =>
          import('../booking/booking.module').then((m) => m.BookingModule),
      },

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
