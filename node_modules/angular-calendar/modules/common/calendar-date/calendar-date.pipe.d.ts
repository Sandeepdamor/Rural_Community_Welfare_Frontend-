import { PipeTransform } from '@angular/core';
import { CalendarDateFormatter } from '../calendar-date-formatter/calendar-date-formatter.provider';
import * as i0 from "@angular/core";
/**
 * This pipe is primarily for rendering the current view title. Example usage:
 * ```typescript
 * // where `viewDate` is a `Date` and view is `'month' | 'week' | 'day'`
 * {{ viewDate | calendarDate:(view + 'ViewTitle'):'en' }}
 * ```
 */
export declare class CalendarDatePipe implements PipeTransform {
    private dateFormatter;
    private locale;
    constructor(dateFormatter: CalendarDateFormatter, locale: string);
    transform(date: Date, method: string, locale?: string, weekStartsOn?: number, excludeDays?: number[], daysInWeek?: number): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<CalendarDatePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<CalendarDatePipe, "calendarDate", false>;
}
