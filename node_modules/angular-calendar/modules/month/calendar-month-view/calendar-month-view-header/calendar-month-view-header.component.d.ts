import { TemplateRef, EventEmitter } from '@angular/core';
import { WeekDay } from 'calendar-utils';
import * as i0 from "@angular/core";
export declare class CalendarMonthViewHeaderComponent {
    days: WeekDay[];
    locale: string;
    customTemplate: TemplateRef<any>;
    columnHeaderClicked: EventEmitter<{
        isoDayNumber: number;
        sourceEvent: MouseEvent;
    }>;
    trackByWeekDayHeaderDate: (index: number, day: WeekDay) => string;
    static ɵfac: i0.ɵɵFactoryDeclaration<CalendarMonthViewHeaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CalendarMonthViewHeaderComponent, "mwl-calendar-month-view-header", never, { "days": "days"; "locale": "locale"; "customTemplate": "customTemplate"; }, { "columnHeaderClicked": "columnHeaderClicked"; }, never, never, false, never>;
}
