import { PipeTransform } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
import { CalendarEventTitleFormatter } from '../calendar-event-title-formatter/calendar-event-title-formatter.provider';
import * as i0 from "@angular/core";
export declare class CalendarEventTitlePipe implements PipeTransform {
    private calendarEventTitle;
    constructor(calendarEventTitle: CalendarEventTitleFormatter);
    transform(title: string, titleType: string, event: CalendarEvent): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<CalendarEventTitlePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<CalendarEventTitlePipe, "calendarEventTitle", false>;
}
