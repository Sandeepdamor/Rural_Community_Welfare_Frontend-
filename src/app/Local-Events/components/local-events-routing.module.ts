import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentRoutes } from '../../shared/utils/component-routes';
import { LocalEventsComponent } from './local-events/local-events.component';
import { LocalEventsAddComponent } from './local-events-add/local-events-add.component';
import { LocalEventsDeleteComponent } from './local-events-delete/local-events-delete.component';

const routes: Routes = [
  {
    path: ComponentRoutes.LOCAL_EVENTS_LIST,
    component: LocalEventsComponent,
  },
  {
    path: ComponentRoutes.LOCAL_EVENTS_ADD,
    component: LocalEventsAddComponent,
  },
  {
    path: ComponentRoutes.LOCAL_EVENTS_DELETE,
    component: LocalEventsDeleteComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocalEventsRoutingModule {}
