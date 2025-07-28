import { TemplateRef } from '@angular/core';
import { WeekViewHourSegment } from 'calendar-utils';
import * as i0 from "@angular/core";
export declare class CalendarWeekViewHourSegmentComponent {
    segment: WeekViewHourSegment;
    segmentHeight: number;
    locale: string;
    isTimeLabel: boolean;
    daysInWeek: number;
    customTemplate: TemplateRef<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CalendarWeekViewHourSegmentComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CalendarWeekViewHourSegmentComponent, "mwl-calendar-week-view-hour-segment", never, { "segment": "segment"; "segmentHeight": "segmentHeight"; "locale": "locale"; "isTimeLabel": "isTimeLabel"; "daysInWeek": "daysInWeek"; "customTemplate": "customTemplate"; }, {}, never, never, false, never>;
}
