import { PipeTransform } from '@angular/core';
import { CalendarA11y } from './calendar-a11y.provider';
import { A11yParams } from './calendar-a11y.interface';
import * as i0 from "@angular/core";
/**
 * This pipe is primarily for rendering aria labels. Example usage:
 * ```typescript
 * // where `myEvent` is a `CalendarEvent` and myLocale is a locale identifier
 * {{ { event: myEvent, locale: myLocale } | calendarA11y: 'eventDescription' }}
 * ```
 */
export declare class CalendarA11yPipe implements PipeTransform {
    private calendarA11y;
    private locale;
    constructor(calendarA11y: CalendarA11y, locale: string);
    transform(a11yParams: A11yParams, method: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<CalendarA11yPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<CalendarA11yPipe, "calendarA11y", false>;
}
