import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { CalendarMonthViewComponent } from './calendar-month-view/calendar-month-view.component';
import { CalendarMonthViewHeaderComponent } from './calendar-month-view/calendar-month-view-header/calendar-month-view-header.component';
import { CalendarMonthCellComponent } from './calendar-month-view/calendar-month-cell/calendar-month-cell.component';
import { CalendarOpenDayEventsComponent } from './calendar-month-view/calendar-open-day-events/calendar-open-day-events.component';
import { CalendarCommonModule } from '../common/calendar-common.module';
import * as i0 from "@angular/core";
export { CalendarMonthViewComponent, } from './calendar-month-view/calendar-month-view.component';
export { collapseAnimation } from './calendar-month-view/calendar-open-day-events/calendar-open-day-events.component';
// needed for ivy, not part of the public api
export { CalendarMonthCellComponent as ɵCalendarMonthCellComponent } from './calendar-month-view/calendar-month-cell/calendar-month-cell.component';
export { CalendarMonthViewHeaderComponent as ɵCalendarMonthViewHeaderComponent } from './calendar-month-view/calendar-month-view-header/calendar-month-view-header.component';
export { CalendarOpenDayEventsComponent as ɵCalendarOpenDayEventsComponent } from './calendar-month-view/calendar-open-day-events/calendar-open-day-events.component';
export class CalendarMonthModule {
}
CalendarMonthModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: CalendarMonthModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CalendarMonthModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.3", ngImport: i0, type: CalendarMonthModule, declarations: [CalendarMonthViewComponent,
        CalendarMonthCellComponent,
        CalendarOpenDayEventsComponent,
        CalendarMonthViewHeaderComponent], imports: [CommonModule, DragAndDropModule, CalendarCommonModule], exports: [DragAndDropModule,
        CalendarMonthViewComponent,
        CalendarMonthCellComponent,
        CalendarOpenDayEventsComponent,
        CalendarMonthViewHeaderComponent] });
CalendarMonthModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: CalendarMonthModule, imports: [CommonModule, DragAndDropModule, CalendarCommonModule, DragAndDropModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: CalendarMonthModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, DragAndDropModule, CalendarCommonModule],
                    declarations: [
                        CalendarMonthViewComponent,
                        CalendarMonthCellComponent,
                        CalendarOpenDayEventsComponent,
                        CalendarMonthViewHeaderComponent,
                    ],
                    exports: [
                        DragAndDropModule,
                        CalendarMonthViewComponent,
                        CalendarMonthCellComponent,
                        CalendarOpenDayEventsComponent,
                        CalendarMonthViewHeaderComponent,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItbW9udGgubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1jYWxlbmRhci9zcmMvbW9kdWxlcy9tb250aC9jYWxlbmRhci1tb250aC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDaEUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDakcsT0FBTyxFQUFFLGdDQUFnQyxFQUFFLE1BQU0sdUZBQXVGLENBQUM7QUFDekksT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0seUVBQXlFLENBQUM7QUFDckgsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sbUZBQW1GLENBQUM7QUFDbkksT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7O0FBRXhFLE9BQU8sRUFDTCwwQkFBMEIsR0FHM0IsTUFBTSxxREFBcUQsQ0FBQztBQUU3RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtRkFBbUYsQ0FBQztBQUV0SCw2Q0FBNkM7QUFDN0MsT0FBTyxFQUFFLDBCQUEwQixJQUFJLDJCQUEyQixFQUFFLE1BQU0seUVBQXlFLENBQUM7QUFDcEosT0FBTyxFQUFFLGdDQUFnQyxJQUFJLGlDQUFpQyxFQUFFLE1BQU0sdUZBQXVGLENBQUM7QUFDOUssT0FBTyxFQUFFLDhCQUE4QixJQUFJLCtCQUErQixFQUFFLE1BQU0sbUZBQW1GLENBQUM7QUFrQnRLLE1BQU0sT0FBTyxtQkFBbUI7O2dIQUFuQixtQkFBbUI7aUhBQW5CLG1CQUFtQixpQkFiNUIsMEJBQTBCO1FBQzFCLDBCQUEwQjtRQUMxQiw4QkFBOEI7UUFDOUIsZ0NBQWdDLGFBTHhCLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxvQkFBb0IsYUFRN0QsaUJBQWlCO1FBQ2pCLDBCQUEwQjtRQUMxQiwwQkFBMEI7UUFDMUIsOEJBQThCO1FBQzlCLGdDQUFnQztpSEFHdkIsbUJBQW1CLFlBZnBCLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxvQkFBb0IsRUFRN0QsaUJBQWlCOzJGQU9SLG1CQUFtQjtrQkFoQi9CLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGlCQUFpQixFQUFFLG9CQUFvQixDQUFDO29CQUNoRSxZQUFZLEVBQUU7d0JBQ1osMEJBQTBCO3dCQUMxQiwwQkFBMEI7d0JBQzFCLDhCQUE4Qjt3QkFDOUIsZ0NBQWdDO3FCQUNqQztvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsaUJBQWlCO3dCQUNqQiwwQkFBMEI7d0JBQzFCLDBCQUEwQjt3QkFDMUIsOEJBQThCO3dCQUM5QixnQ0FBZ0M7cUJBQ2pDO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEcmFnQW5kRHJvcE1vZHVsZSB9IGZyb20gJ2FuZ3VsYXItZHJhZ2dhYmxlLWRyb3BwYWJsZSc7XG5pbXBvcnQgeyBDYWxlbmRhck1vbnRoVmlld0NvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXItbW9udGgtdmlldy9jYWxlbmRhci1tb250aC12aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYWxlbmRhck1vbnRoVmlld0hlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXItbW9udGgtdmlldy9jYWxlbmRhci1tb250aC12aWV3LWhlYWRlci9jYWxlbmRhci1tb250aC12aWV3LWhlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FsZW5kYXJNb250aENlbGxDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLW1vbnRoLXZpZXcvY2FsZW5kYXItbW9udGgtY2VsbC9jYWxlbmRhci1tb250aC1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYWxlbmRhck9wZW5EYXlFdmVudHNDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLW1vbnRoLXZpZXcvY2FsZW5kYXItb3Blbi1kYXktZXZlbnRzL2NhbGVuZGFyLW9wZW4tZGF5LWV2ZW50cy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FsZW5kYXJDb21tb25Nb2R1bGUgfSBmcm9tICcuLi9jb21tb24vY2FsZW5kYXItY29tbW9uLm1vZHVsZSc7XG5cbmV4cG9ydCB7XG4gIENhbGVuZGFyTW9udGhWaWV3Q29tcG9uZW50LFxuICBDYWxlbmRhck1vbnRoVmlld0JlZm9yZVJlbmRlckV2ZW50LFxuICBDYWxlbmRhck1vbnRoVmlld0V2ZW50VGltZXNDaGFuZ2VkRXZlbnQsXG59IGZyb20gJy4vY2FsZW5kYXItbW9udGgtdmlldy9jYWxlbmRhci1tb250aC12aWV3LmNvbXBvbmVudCc7XG5leHBvcnQgeyBNb250aFZpZXdEYXkgYXMgQ2FsZW5kYXJNb250aFZpZXdEYXkgfSBmcm9tICdjYWxlbmRhci11dGlscyc7XG5leHBvcnQgeyBjb2xsYXBzZUFuaW1hdGlvbiB9IGZyb20gJy4vY2FsZW5kYXItbW9udGgtdmlldy9jYWxlbmRhci1vcGVuLWRheS1ldmVudHMvY2FsZW5kYXItb3Blbi1kYXktZXZlbnRzLmNvbXBvbmVudCc7XG5cbi8vIG5lZWRlZCBmb3IgaXZ5LCBub3QgcGFydCBvZiB0aGUgcHVibGljIGFwaVxuZXhwb3J0IHsgQ2FsZW5kYXJNb250aENlbGxDb21wb25lbnQgYXMgybVDYWxlbmRhck1vbnRoQ2VsbENvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXItbW9udGgtdmlldy9jYWxlbmRhci1tb250aC1jZWxsL2NhbGVuZGFyLW1vbnRoLWNlbGwuY29tcG9uZW50JztcbmV4cG9ydCB7IENhbGVuZGFyTW9udGhWaWV3SGVhZGVyQ29tcG9uZW50IGFzIMm1Q2FsZW5kYXJNb250aFZpZXdIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLW1vbnRoLXZpZXcvY2FsZW5kYXItbW9udGgtdmlldy1oZWFkZXIvY2FsZW5kYXItbW9udGgtdmlldy1oZWFkZXIuY29tcG9uZW50JztcbmV4cG9ydCB7IENhbGVuZGFyT3BlbkRheUV2ZW50c0NvbXBvbmVudCBhcyDJtUNhbGVuZGFyT3BlbkRheUV2ZW50c0NvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXItbW9udGgtdmlldy9jYWxlbmRhci1vcGVuLWRheS1ldmVudHMvY2FsZW5kYXItb3Blbi1kYXktZXZlbnRzLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIERyYWdBbmREcm9wTW9kdWxlLCBDYWxlbmRhckNvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIENhbGVuZGFyTW9udGhWaWV3Q29tcG9uZW50LFxuICAgIENhbGVuZGFyTW9udGhDZWxsQ29tcG9uZW50LFxuICAgIENhbGVuZGFyT3BlbkRheUV2ZW50c0NvbXBvbmVudCxcbiAgICBDYWxlbmRhck1vbnRoVmlld0hlYWRlckNvbXBvbmVudCxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERyYWdBbmREcm9wTW9kdWxlLFxuICAgIENhbGVuZGFyTW9udGhWaWV3Q29tcG9uZW50LFxuICAgIENhbGVuZGFyTW9udGhDZWxsQ29tcG9uZW50LFxuICAgIENhbGVuZGFyT3BlbkRheUV2ZW50c0NvbXBvbmVudCxcbiAgICBDYWxlbmRhck1vbnRoVmlld0hlYWRlckNvbXBvbmVudCxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJNb250aE1vZHVsZSB7fVxuIl19