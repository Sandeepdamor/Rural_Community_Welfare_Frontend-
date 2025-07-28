import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResizableModule } from 'angular-resizable-element';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { CalendarWeekViewComponent } from './calendar-week-view/calendar-week-view.component';
import { CalendarWeekViewHeaderComponent } from './calendar-week-view/calendar-week-view-header/calendar-week-view-header.component';
import { CalendarWeekViewEventComponent } from './calendar-week-view/calendar-week-view-event/calendar-week-view-event.component';
import { CalendarCommonModule } from '../common/calendar-common.module';
import { CalendarWeekViewHourSegmentComponent } from './calendar-week-view/calendar-week-view-hour-segment/calendar-week-view-hour-segment.component';
import { CalendarWeekViewCurrentTimeMarkerComponent } from './calendar-week-view/calendar-week-view-current-time-marker/calendar-week-view-current-time-marker.component';
import * as i0 from "@angular/core";
export { CalendarWeekViewComponent, } from './calendar-week-view/calendar-week-view.component';
export { getWeekViewPeriod } from '../common/util/util';
// needed for ivy, not part of the public api
export { CalendarWeekViewHeaderComponent as ɵCalendarWeekViewHeaderComponent } from './calendar-week-view/calendar-week-view-header/calendar-week-view-header.component';
export { CalendarWeekViewEventComponent as ɵCalendarWeekViewEventComponent } from './calendar-week-view/calendar-week-view-event/calendar-week-view-event.component';
export { CalendarWeekViewHourSegmentComponent as ɵCalendarWeekViewHourSegmentComponent } from './calendar-week-view/calendar-week-view-hour-segment/calendar-week-view-hour-segment.component';
export { CalendarWeekViewCurrentTimeMarkerComponent as ɵCalendarWeekViewCurrentTimeMarkerComponent } from './calendar-week-view/calendar-week-view-current-time-marker/calendar-week-view-current-time-marker.component';
export class CalendarWeekModule {
}
CalendarWeekModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: CalendarWeekModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CalendarWeekModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.3", ngImport: i0, type: CalendarWeekModule, declarations: [CalendarWeekViewComponent,
        CalendarWeekViewHeaderComponent,
        CalendarWeekViewEventComponent,
        CalendarWeekViewHourSegmentComponent,
        CalendarWeekViewCurrentTimeMarkerComponent], imports: [CommonModule,
        ResizableModule,
        DragAndDropModule,
        CalendarCommonModule], exports: [ResizableModule,
        DragAndDropModule,
        CalendarWeekViewComponent,
        CalendarWeekViewHeaderComponent,
        CalendarWeekViewEventComponent,
        CalendarWeekViewHourSegmentComponent,
        CalendarWeekViewCurrentTimeMarkerComponent] });
CalendarWeekModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: CalendarWeekModule, imports: [CommonModule,
        ResizableModule,
        DragAndDropModule,
        CalendarCommonModule, ResizableModule,
        DragAndDropModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: CalendarWeekModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ResizableModule,
                        DragAndDropModule,
                        CalendarCommonModule,
                    ],
                    declarations: [
                        CalendarWeekViewComponent,
                        CalendarWeekViewHeaderComponent,
                        CalendarWeekViewEventComponent,
                        CalendarWeekViewHourSegmentComponent,
                        CalendarWeekViewCurrentTimeMarkerComponent,
                    ],
                    exports: [
                        ResizableModule,
                        DragAndDropModule,
                        CalendarWeekViewComponent,
                        CalendarWeekViewHeaderComponent,
                        CalendarWeekViewEventComponent,
                        CalendarWeekViewHourSegmentComponent,
                        CalendarWeekViewCurrentTimeMarkerComponent,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItd2Vlay5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWNhbGVuZGFyL3NyYy9tb2R1bGVzL3dlZWsvY2FsZW5kYXItd2Vlay5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQzlGLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLG9GQUFvRixDQUFDO0FBQ3JJLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLGtGQUFrRixDQUFDO0FBQ2xJLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxvQ0FBb0MsRUFBRSxNQUFNLGdHQUFnRyxDQUFDO0FBQ3RKLE9BQU8sRUFBRSwwQ0FBMEMsRUFBRSxNQUFNLDhHQUE4RyxDQUFDOztBQUUxSyxPQUFPLEVBQ0wseUJBQXlCLEdBRTFCLE1BQU0sbURBQW1ELENBQUM7QUFNM0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFeEQsNkNBQTZDO0FBQzdDLE9BQU8sRUFBRSwrQkFBK0IsSUFBSSxnQ0FBZ0MsRUFBRSxNQUFNLG9GQUFvRixDQUFDO0FBQ3pLLE9BQU8sRUFBRSw4QkFBOEIsSUFBSSwrQkFBK0IsRUFBRSxNQUFNLGtGQUFrRixDQUFDO0FBQ3JLLE9BQU8sRUFBRSxvQ0FBb0MsSUFBSSxxQ0FBcUMsRUFBRSxNQUFNLGdHQUFnRyxDQUFDO0FBQy9MLE9BQU8sRUFBRSwwQ0FBMEMsSUFBSSwyQ0FBMkMsRUFBRSxNQUFNLDhHQUE4RyxDQUFDO0FBMEJ6TixNQUFNLE9BQU8sa0JBQWtCOzsrR0FBbEIsa0JBQWtCO2dIQUFsQixrQkFBa0IsaUJBaEIzQix5QkFBeUI7UUFDekIsK0JBQStCO1FBQy9CLDhCQUE4QjtRQUM5QixvQ0FBb0M7UUFDcEMsMENBQTBDLGFBVjFDLFlBQVk7UUFDWixlQUFlO1FBQ2YsaUJBQWlCO1FBQ2pCLG9CQUFvQixhQVVwQixlQUFlO1FBQ2YsaUJBQWlCO1FBQ2pCLHlCQUF5QjtRQUN6QiwrQkFBK0I7UUFDL0IsOEJBQThCO1FBQzlCLG9DQUFvQztRQUNwQywwQ0FBMEM7Z0hBR2pDLGtCQUFrQixZQXRCM0IsWUFBWTtRQUNaLGVBQWU7UUFDZixpQkFBaUI7UUFDakIsb0JBQW9CLEVBVXBCLGVBQWU7UUFDZixpQkFBaUI7MkZBUVIsa0JBQWtCO2tCQXhCOUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixlQUFlO3dCQUNmLGlCQUFpQjt3QkFDakIsb0JBQW9CO3FCQUNyQjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1oseUJBQXlCO3dCQUN6QiwrQkFBK0I7d0JBQy9CLDhCQUE4Qjt3QkFDOUIsb0NBQW9DO3dCQUNwQywwQ0FBMEM7cUJBQzNDO29CQUNELE9BQU8sRUFBRTt3QkFDUCxlQUFlO3dCQUNmLGlCQUFpQjt3QkFDakIseUJBQXlCO3dCQUN6QiwrQkFBK0I7d0JBQy9CLDhCQUE4Qjt3QkFDOUIsb0NBQW9DO3dCQUNwQywwQ0FBMEM7cUJBQzNDO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSZXNpemFibGVNb2R1bGUgfSBmcm9tICdhbmd1bGFyLXJlc2l6YWJsZS1lbGVtZW50JztcbmltcG9ydCB7IERyYWdBbmREcm9wTW9kdWxlIH0gZnJvbSAnYW5ndWxhci1kcmFnZ2FibGUtZHJvcHBhYmxlJztcbmltcG9ydCB7IENhbGVuZGFyV2Vla1ZpZXdDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLXdlZWstdmlldy9jYWxlbmRhci13ZWVrLXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IENhbGVuZGFyV2Vla1ZpZXdIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLXdlZWstdmlldy9jYWxlbmRhci13ZWVrLXZpZXctaGVhZGVyL2NhbGVuZGFyLXdlZWstdmlldy1oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IENhbGVuZGFyV2Vla1ZpZXdFdmVudENvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXItd2Vlay12aWV3L2NhbGVuZGFyLXdlZWstdmlldy1ldmVudC9jYWxlbmRhci13ZWVrLXZpZXctZXZlbnQuY29tcG9uZW50JztcbmltcG9ydCB7IENhbGVuZGFyQ29tbW9uTW9kdWxlIH0gZnJvbSAnLi4vY29tbW9uL2NhbGVuZGFyLWNvbW1vbi5tb2R1bGUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJXZWVrVmlld0hvdXJTZWdtZW50Q29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci13ZWVrLXZpZXcvY2FsZW5kYXItd2Vlay12aWV3LWhvdXItc2VnbWVudC9jYWxlbmRhci13ZWVrLXZpZXctaG91ci1zZWdtZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYWxlbmRhcldlZWtWaWV3Q3VycmVudFRpbWVNYXJrZXJDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLXdlZWstdmlldy9jYWxlbmRhci13ZWVrLXZpZXctY3VycmVudC10aW1lLW1hcmtlci9jYWxlbmRhci13ZWVrLXZpZXctY3VycmVudC10aW1lLW1hcmtlci5jb21wb25lbnQnO1xuXG5leHBvcnQge1xuICBDYWxlbmRhcldlZWtWaWV3Q29tcG9uZW50LFxuICBDYWxlbmRhcldlZWtWaWV3QmVmb3JlUmVuZGVyRXZlbnQsXG59IGZyb20gJy4vY2FsZW5kYXItd2Vlay12aWV3L2NhbGVuZGFyLXdlZWstdmlldy5jb21wb25lbnQnO1xuZXhwb3J0IHtcbiAgV2Vla1ZpZXdBbGxEYXlFdmVudCBhcyBDYWxlbmRhcldlZWtWaWV3QWxsRGF5RXZlbnQsXG4gIFdlZWtWaWV3QWxsRGF5RXZlbnRSb3cgYXMgQ2FsZW5kYXJXZWVrVmlld0FsbERheUV2ZW50Um93LFxuICBHZXRXZWVrVmlld0FyZ3MgYXMgQ2FsZW5kYXJHZXRXZWVrVmlld0FyZ3MsXG59IGZyb20gJ2NhbGVuZGFyLXV0aWxzJztcbmV4cG9ydCB7IGdldFdlZWtWaWV3UGVyaW9kIH0gZnJvbSAnLi4vY29tbW9uL3V0aWwvdXRpbCc7XG5cbi8vIG5lZWRlZCBmb3IgaXZ5LCBub3QgcGFydCBvZiB0aGUgcHVibGljIGFwaVxuZXhwb3J0IHsgQ2FsZW5kYXJXZWVrVmlld0hlYWRlckNvbXBvbmVudCBhcyDJtUNhbGVuZGFyV2Vla1ZpZXdIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLXdlZWstdmlldy9jYWxlbmRhci13ZWVrLXZpZXctaGVhZGVyL2NhbGVuZGFyLXdlZWstdmlldy1oZWFkZXIuY29tcG9uZW50JztcbmV4cG9ydCB7IENhbGVuZGFyV2Vla1ZpZXdFdmVudENvbXBvbmVudCBhcyDJtUNhbGVuZGFyV2Vla1ZpZXdFdmVudENvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXItd2Vlay12aWV3L2NhbGVuZGFyLXdlZWstdmlldy1ldmVudC9jYWxlbmRhci13ZWVrLXZpZXctZXZlbnQuY29tcG9uZW50JztcbmV4cG9ydCB7IENhbGVuZGFyV2Vla1ZpZXdIb3VyU2VnbWVudENvbXBvbmVudCBhcyDJtUNhbGVuZGFyV2Vla1ZpZXdIb3VyU2VnbWVudENvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXItd2Vlay12aWV3L2NhbGVuZGFyLXdlZWstdmlldy1ob3VyLXNlZ21lbnQvY2FsZW5kYXItd2Vlay12aWV3LWhvdXItc2VnbWVudC5jb21wb25lbnQnO1xuZXhwb3J0IHsgQ2FsZW5kYXJXZWVrVmlld0N1cnJlbnRUaW1lTWFya2VyQ29tcG9uZW50IGFzIMm1Q2FsZW5kYXJXZWVrVmlld0N1cnJlbnRUaW1lTWFya2VyQ29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci13ZWVrLXZpZXcvY2FsZW5kYXItd2Vlay12aWV3LWN1cnJlbnQtdGltZS1tYXJrZXIvY2FsZW5kYXItd2Vlay12aWV3LWN1cnJlbnQtdGltZS1tYXJrZXIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBSZXNpemFibGVNb2R1bGUsXG4gICAgRHJhZ0FuZERyb3BNb2R1bGUsXG4gICAgQ2FsZW5kYXJDb21tb25Nb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIENhbGVuZGFyV2Vla1ZpZXdDb21wb25lbnQsXG4gICAgQ2FsZW5kYXJXZWVrVmlld0hlYWRlckNvbXBvbmVudCxcbiAgICBDYWxlbmRhcldlZWtWaWV3RXZlbnRDb21wb25lbnQsXG4gICAgQ2FsZW5kYXJXZWVrVmlld0hvdXJTZWdtZW50Q29tcG9uZW50LFxuICAgIENhbGVuZGFyV2Vla1ZpZXdDdXJyZW50VGltZU1hcmtlckNvbXBvbmVudCxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFJlc2l6YWJsZU1vZHVsZSxcbiAgICBEcmFnQW5kRHJvcE1vZHVsZSxcbiAgICBDYWxlbmRhcldlZWtWaWV3Q29tcG9uZW50LFxuICAgIENhbGVuZGFyV2Vla1ZpZXdIZWFkZXJDb21wb25lbnQsXG4gICAgQ2FsZW5kYXJXZWVrVmlld0V2ZW50Q29tcG9uZW50LFxuICAgIENhbGVuZGFyV2Vla1ZpZXdIb3VyU2VnbWVudENvbXBvbmVudCxcbiAgICBDYWxlbmRhcldlZWtWaWV3Q3VycmVudFRpbWVNYXJrZXJDb21wb25lbnQsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyV2Vla01vZHVsZSB7fVxuIl19