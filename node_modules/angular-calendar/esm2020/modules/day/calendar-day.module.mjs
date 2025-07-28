import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarDayViewComponent } from './calendar-day-view/calendar-day-view.component';
import { CalendarCommonModule } from '../common/calendar-common.module';
import { CalendarWeekModule } from '../week/calendar-week.module';
import * as i0 from "@angular/core";
export { CalendarDayViewComponent, } from './calendar-day-view/calendar-day-view.component';
export class CalendarDayModule {
}
CalendarDayModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: CalendarDayModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CalendarDayModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.3", ngImport: i0, type: CalendarDayModule, declarations: [CalendarDayViewComponent], imports: [CommonModule, CalendarCommonModule, CalendarWeekModule], exports: [CalendarDayViewComponent] });
CalendarDayModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: CalendarDayModule, imports: [CommonModule, CalendarCommonModule, CalendarWeekModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: CalendarDayModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, CalendarCommonModule, CalendarWeekModule],
                    declarations: [CalendarDayViewComponent],
                    exports: [CalendarDayViewComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZGF5Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItY2FsZW5kYXIvc3JjL21vZHVsZXMvZGF5L2NhbGVuZGFyLWRheS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0saURBQWlELENBQUM7QUFDM0YsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOEJBQThCLENBQUM7O0FBRWxFLE9BQU8sRUFDTCx3QkFBd0IsR0FFekIsTUFBTSxpREFBaUQsQ0FBQztBQU96RCxNQUFNLE9BQU8saUJBQWlCOzs4R0FBakIsaUJBQWlCOytHQUFqQixpQkFBaUIsaUJBSGIsd0JBQXdCLGFBRDdCLFlBQVksRUFBRSxvQkFBb0IsRUFBRSxrQkFBa0IsYUFFdEQsd0JBQXdCOytHQUV2QixpQkFBaUIsWUFKbEIsWUFBWSxFQUFFLG9CQUFvQixFQUFFLGtCQUFrQjsyRkFJckQsaUJBQWlCO2tCQUw3QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxvQkFBb0IsRUFBRSxrQkFBa0IsQ0FBQztvQkFDakUsWUFBWSxFQUFFLENBQUMsd0JBQXdCLENBQUM7b0JBQ3hDLE9BQU8sRUFBRSxDQUFDLHdCQUF3QixDQUFDO2lCQUNwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ2FsZW5kYXJEYXlWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci1kYXktdmlldy9jYWxlbmRhci1kYXktdmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FsZW5kYXJDb21tb25Nb2R1bGUgfSBmcm9tICcuLi9jb21tb24vY2FsZW5kYXItY29tbW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBDYWxlbmRhcldlZWtNb2R1bGUgfSBmcm9tICcuLi93ZWVrL2NhbGVuZGFyLXdlZWsubW9kdWxlJztcblxuZXhwb3J0IHtcbiAgQ2FsZW5kYXJEYXlWaWV3Q29tcG9uZW50LFxuICBDYWxlbmRhckRheVZpZXdCZWZvcmVSZW5kZXJFdmVudCxcbn0gZnJvbSAnLi9jYWxlbmRhci1kYXktdmlldy9jYWxlbmRhci1kYXktdmlldy5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBDYWxlbmRhckNvbW1vbk1vZHVsZSwgQ2FsZW5kYXJXZWVrTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbQ2FsZW5kYXJEYXlWaWV3Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW0NhbGVuZGFyRGF5Vmlld0NvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyRGF5TW9kdWxlIHt9XG4iXX0=