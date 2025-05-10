import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddSarpanchComponent } from "../sarpanch/componenets/add-sarpanch/add-sarpanch.component";
import { ComponentRoutes } from "../shared/utils/component-routes";
import { AddCategoryComponent } from "./components/add-category/add-category.component";
import { CategoryListComponent } from "./components/category-list/category-list.component";

const routes: Routes = [

  {
    path: ComponentRoutes.CATEGORY,
    component: CategoryListComponent,
  },
  {
    path: ComponentRoutes.CATEGORYLIST,
    component: CategoryListComponent,
  },
  {
    path: ComponentRoutes.CATEGORYADD,
    component: AddCategoryComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule { }
