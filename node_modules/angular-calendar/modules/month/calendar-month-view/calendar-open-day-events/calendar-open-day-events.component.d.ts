import { EventEmitter, TemplateRef } from '@angular/core';
import { AnimationTriggerMetadata } from '@angular/animations';
import { CalendarEvent } from 'calendar-utils';
import { isWithinThreshold } from '../../../common/util/util';
import * as i0 from "@angular/core";
export declare const collapseAnimation: AnimationTriggerMetadata;
export declare class CalendarOpenDayEventsComponent {
    locale: string;
    isOpen: boolean;
    events: CalendarEvent[];
    customTemplate: TemplateRef<any>;
    eventTitleTemplate: TemplateRef<any>;
    eventActionsTemplate: TemplateRef<any>;
    date: Date;
    eventClicked: EventEmitter<{
        event: CalendarEvent;
        sourceEvent: MouseEvent | KeyboardEvent;
    }>;
    trackByEventId: (index: number, event: CalendarEvent<any>) => string | number | CalendarEvent<any>;
    validateDrag: typeof isWithinThreshold;
    static ɵfac: i0.ɵɵFactoryDeclaration<CalendarOpenDayEventsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CalendarOpenDayEventsComponent, "mwl-calendar-open-day-events", never, { "locale": "locale"; "isOpen": "isOpen"; "events": "events"; "customTemplate": "customTemplate"; "eventTitleTemplate": "eventTitleTemplate"; "eventActionsTemplate": "eventActionsTemplate"; "date": "date"; }, { "eventClicked": "eventClicked"; }, never, never, false, never>;
}
