import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentRoutes } from '../shared/utils/component-routes';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { AddBookingComponent } from './components/add-booking/add-booking.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: ComponentRoutes.BOOKINGLIST,
    pathMatch: 'full',
  },
  {
    path: ComponentRoutes.BOOKINGLIST,
    component: BookingListComponent,
  },
  {
    path: ComponentRoutes.BOOKINGADD,
    component: AddBookingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingRoutingModule {}
