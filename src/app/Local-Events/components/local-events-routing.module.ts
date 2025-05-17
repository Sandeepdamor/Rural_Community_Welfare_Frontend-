import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentRoutes } from '../../shared/utils/component-routes';
import { LocalEventsComponent } from './local-events/local-events.component';
import { LocalEventsAddComponent } from './local-events-add/local-events-add.component';

const routes: Routes = [
  {
    path: ComponentRoutes.LOCAL_EVENTS_LIST,
    component: LocalEventsComponent,
  },
  {
    path: ComponentRoutes.LOCAL_EVENTS_ADD,
    component: LocalEventsAddComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocalEventsRoutingModule {}
