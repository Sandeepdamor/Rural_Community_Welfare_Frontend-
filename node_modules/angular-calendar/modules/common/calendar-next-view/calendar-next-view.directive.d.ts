import { EventEmitter } from '@angular/core';
import { DateAdapter } from '../../../date-adapters/date-adapter';
import { CalendarView } from '../calendar-view/calendar-view.enum';
import * as i0 from "@angular/core";
/**
 * Change the view date to the next view. For example:
 *
 * ```typescript
 * <button
 *  mwlCalendarNextView
 *  [(viewDate)]="viewDate"
 *  [view]="view">
 *  Next
 * </button>
 * ```
 */
export declare class CalendarNextViewDirective {
    private dateAdapter;
    /**
     * The current view
     */
    view: CalendarView | 'month' | 'week' | 'day';
    /**
     * The current view date
     */
    viewDate: Date;
    /**
     * Days to skip when going forward by 1 day
     */
    excludeDays: number[];
    /**
     * The number of days in a week. If set will add this amount of days instead of 1 week
     */
    daysInWeek: number;
    /**
     * Called when the view date is changed
     */
    viewDateChange: EventEmitter<Date>;
    constructor(dateAdapter: DateAdapter);
    /**
     * @hidden
     */
    onClick(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CalendarNextViewDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<CalendarNextViewDirective, "[mwlCalendarNextView]", never, { "view": "view"; "viewDate": "viewDate"; "excludeDays": "excludeDays"; "daysInWeek": "daysInWeek"; }, { "viewDateChange": "viewDateChange"; }, never, never, false, never>;
}
