import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentRoutes } from '../shared/utils/component-routes';
import { VendorListComponent } from './components/vendor-list/vendor-list.component';
import { AddVendorComponent } from './components/add-vendor/add-vendor.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: ComponentRoutes.VENDORLIST,
    pathMatch: 'full',
  },
  {
    path: ComponentRoutes.VENDORLIST,
    component: VendorListComponent,
  },
  {
    path: ComponentRoutes.VENDORADD,
    component: AddVendorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorRoutingModule {}
