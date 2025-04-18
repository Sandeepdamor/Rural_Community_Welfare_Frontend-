import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentRoutes } from '../shared/utils/component-routes';
import { ServiceCategoryListComponent } from './components/service-category-list/service-category-list.component';
import { AddServiceCategoryComponent } from './components/add-service-category/add-service-category.component';

const routes: Routes = [

  {
    path:'',
    redirectTo:ComponentRoutes.SERVICECETEGORYLIST,
    pathMatch:'full'
  },
  {
    path:ComponentRoutes.SERVICECETEGORYLIST,
    component:ServiceCategoryListComponent,
  },
  {
    path:ComponentRoutes.SERVICECETEGORYADD,
    component:AddServiceCategoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceCategoryRoutingModule { }
