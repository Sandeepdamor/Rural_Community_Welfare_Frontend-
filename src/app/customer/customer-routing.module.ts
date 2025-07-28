import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentRoutes } from '../shared/utils/component-routes';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { UserListComponent } from '../users/components/user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerListComponent,
  },
  {
    path: ComponentRoutes.CUSTOMERADD,
    component: AddCustomerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
