import { AnnouncementsDeleteComponent } from './announcements-delete/announcements-delete.component';
import { RouterModule, Routes } from '@angular/router';
import { AnnouncementListComponent } from './announcement-list/announcement-list.component';
import { ComponentRoutes } from '../../shared/utils/component-routes';
import { NgModule } from '@angular/core';
import { AnnouncementsAddComponent } from './announcements-add/announcements-add.component';

const routes: Routes = [
  {
    path: ComponentRoutes.ANNOUNCEMENTLIST,
    component: AnnouncementListComponent,
  },
  {
    path: ComponentRoutes.ADDANNOUNCEMENTS,
    component: AnnouncementsAddComponent,
  },
  {
    path: ComponentRoutes.DELETEANNOUNCEMENTS,
    component: AnnouncementsDeleteComponent,
  },
  {
    path: 'add/:id',
    component: AnnouncementsAddComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnnouncementRoutingModule {}
