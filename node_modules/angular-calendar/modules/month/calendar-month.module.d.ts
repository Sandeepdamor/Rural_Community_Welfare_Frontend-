import * as i0 from "@angular/core";
import * as i1 from "./calendar-month-view/calendar-month-view.component";
import * as i2 from "./calendar-month-view/calendar-month-cell/calendar-month-cell.component";
import * as i3 from "./calendar-month-view/calendar-open-day-events/calendar-open-day-events.component";
import * as i4 from "./calendar-month-view/calendar-month-view-header/calendar-month-view-header.component";
import * as i5 from "@angular/common";
import * as i6 from "angular-draggable-droppable";
import * as i7 from "../common/calendar-common.module";
export { CalendarMonthViewComponent, CalendarMonthViewBeforeRenderEvent, CalendarMonthViewEventTimesChangedEvent, } from './calendar-month-view/calendar-month-view.component';
export { MonthViewDay as CalendarMonthViewDay } from 'calendar-utils';
export { collapseAnimation } from './calendar-month-view/calendar-open-day-events/calendar-open-day-events.component';
export { CalendarMonthCellComponent as ɵCalendarMonthCellComponent } from './calendar-month-view/calendar-month-cell/calendar-month-cell.component';
export { CalendarMonthViewHeaderComponent as ɵCalendarMonthViewHeaderComponent } from './calendar-month-view/calendar-month-view-header/calendar-month-view-header.component';
export { CalendarOpenDayEventsComponent as ɵCalendarOpenDayEventsComponent } from './calendar-month-view/calendar-open-day-events/calendar-open-day-events.component';
export declare class CalendarMonthModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<CalendarMonthModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<CalendarMonthModule, [typeof i1.CalendarMonthViewComponent, typeof i2.CalendarMonthCellComponent, typeof i3.CalendarOpenDayEventsComponent, typeof i4.CalendarMonthViewHeaderComponent], [typeof i5.CommonModule, typeof i6.DragAndDropModule, typeof i7.CalendarCommonModule], [typeof i6.DragAndDropModule, typeof i1.CalendarMonthViewComponent, typeof i2.CalendarMonthCellComponent, typeof i3.CalendarOpenDayEventsComponent, typeof i4.CalendarMonthViewHeaderComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<CalendarMonthModule>;
}
