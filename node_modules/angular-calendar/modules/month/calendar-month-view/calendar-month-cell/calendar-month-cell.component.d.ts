import { EventEmitter, TemplateRef } from '@angular/core';
import { MonthViewDay, CalendarEvent } from 'calendar-utils';
import { isWithinThreshold } from '../../../common/util/util';
import { PlacementArray } from 'positioning';
import * as i0 from "@angular/core";
export declare class CalendarMonthCellComponent {
    day: MonthViewDay;
    openDay: MonthViewDay;
    locale: string;
    tooltipPlacement: PlacementArray;
    tooltipAppendToBody: boolean;
    customTemplate: TemplateRef<any>;
    tooltipTemplate: TemplateRef<any>;
    tooltipDelay: number | null;
    highlightDay: EventEmitter<any>;
    unhighlightDay: EventEmitter<any>;
    eventClicked: EventEmitter<{
        event: CalendarEvent;
        sourceEvent: MouseEvent;
    }>;
    trackByEventId: (index: number, event: CalendarEvent<any>) => string | number | CalendarEvent<any>;
    validateDrag: typeof isWithinThreshold;
    static ɵfac: i0.ɵɵFactoryDeclaration<CalendarMonthCellComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CalendarMonthCellComponent, "mwl-calendar-month-cell", never, { "day": "day"; "openDay": "openDay"; "locale": "locale"; "tooltipPlacement": "tooltipPlacement"; "tooltipAppendToBody": "tooltipAppendToBody"; "customTemplate": "customTemplate"; "tooltipTemplate": "tooltipTemplate"; "tooltipDelay": "tooltipDelay"; }, { "highlightDay": "highlightDay"; "unhighlightDay": "unhighlightDay"; "eventClicked": "eventClicked"; }, never, never, false, never>;
}
