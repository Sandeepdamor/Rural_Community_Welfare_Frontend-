import { EventEmitter } from '@angular/core';
import { DateAdapter } from '../../../date-adapters/date-adapter';
import * as i0 from "@angular/core";
/**
 * Change the view date to the current day. For example:
 *
 * ```typescript
 * <button
 *  mwlCalendarToday
 *  [(viewDate)]="viewDate">
 *  Today
 * </button>
 * ```
 */
export declare class CalendarTodayDirective {
    private dateAdapter;
    /**
     * The current view date
     */
    viewDate: Date;
    /**
     * Called when the view date is changed
     */
    viewDateChange: EventEmitter<Date>;
    constructor(dateAdapter: DateAdapter);
    /**
     * @hidden
     */
    onClick(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CalendarTodayDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<CalendarTodayDirective, "[mwlCalendarToday]", never, { "viewDate": "viewDate"; }, { "viewDateChange": "viewDateChange"; }, never, never, false, never>;
}
