import * as i0 from "@angular/core";
import * as i1 from "./calendar-week-view/calendar-week-view.component";
import * as i2 from "./calendar-week-view/calendar-week-view-header/calendar-week-view-header.component";
import * as i3 from "./calendar-week-view/calendar-week-view-event/calendar-week-view-event.component";
import * as i4 from "./calendar-week-view/calendar-week-view-hour-segment/calendar-week-view-hour-segment.component";
import * as i5 from "./calendar-week-view/calendar-week-view-current-time-marker/calendar-week-view-current-time-marker.component";
import * as i6 from "@angular/common";
import * as i7 from "angular-resizable-element";
import * as i8 from "angular-draggable-droppable";
import * as i9 from "../common/calendar-common.module";
export { CalendarWeekViewComponent, CalendarWeekViewBeforeRenderEvent, } from './calendar-week-view/calendar-week-view.component';
export { WeekViewAllDayEvent as CalendarWeekViewAllDayEvent, WeekViewAllDayEventRow as CalendarWeekViewAllDayEventRow, GetWeekViewArgs as CalendarGetWeekViewArgs, } from 'calendar-utils';
export { getWeekViewPeriod } from '../common/util/util';
export { CalendarWeekViewHeaderComponent as ɵCalendarWeekViewHeaderComponent } from './calendar-week-view/calendar-week-view-header/calendar-week-view-header.component';
export { CalendarWeekViewEventComponent as ɵCalendarWeekViewEventComponent } from './calendar-week-view/calendar-week-view-event/calendar-week-view-event.component';
export { CalendarWeekViewHourSegmentComponent as ɵCalendarWeekViewHourSegmentComponent } from './calendar-week-view/calendar-week-view-hour-segment/calendar-week-view-hour-segment.component';
export { CalendarWeekViewCurrentTimeMarkerComponent as ɵCalendarWeekViewCurrentTimeMarkerComponent } from './calendar-week-view/calendar-week-view-current-time-marker/calendar-week-view-current-time-marker.component';
export declare class CalendarWeekModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<CalendarWeekModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<CalendarWeekModule, [typeof i1.CalendarWeekViewComponent, typeof i2.CalendarWeekViewHeaderComponent, typeof i3.CalendarWeekViewEventComponent, typeof i4.CalendarWeekViewHourSegmentComponent, typeof i5.CalendarWeekViewCurrentTimeMarkerComponent], [typeof i6.CommonModule, typeof i7.ResizableModule, typeof i8.DragAndDropModule, typeof i9.CalendarCommonModule], [typeof i7.ResizableModule, typeof i8.DragAndDropModule, typeof i1.CalendarWeekViewComponent, typeof i2.CalendarWeekViewHeaderComponent, typeof i3.CalendarWeekViewEventComponent, typeof i4.CalendarWeekViewHourSegmentComponent, typeof i5.CalendarWeekViewCurrentTimeMarkerComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<CalendarWeekModule>;
}
