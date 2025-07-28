import { EventEmitter, TemplateRef } from '@angular/core';
import { WeekViewAllDayEvent, WeekViewTimeEvent, WeekViewHourColumn } from 'calendar-utils';
import { PlacementArray } from 'positioning';
import * as i0 from "@angular/core";
export declare class CalendarWeekViewEventComponent {
    locale: string;
    weekEvent: WeekViewAllDayEvent | WeekViewTimeEvent;
    tooltipPlacement: PlacementArray;
    tooltipAppendToBody: boolean;
    tooltipDisabled: boolean;
    tooltipDelay: number | null;
    customTemplate: TemplateRef<any>;
    eventTitleTemplate: TemplateRef<any>;
    eventActionsTemplate: TemplateRef<any>;
    tooltipTemplate: TemplateRef<any>;
    column: WeekViewHourColumn;
    daysInWeek: number;
    eventClicked: EventEmitter<{
        sourceEvent: MouseEvent | KeyboardEvent;
    }>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CalendarWeekViewEventComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CalendarWeekViewEventComponent, "mwl-calendar-week-view-event", never, { "locale": "locale"; "weekEvent": "weekEvent"; "tooltipPlacement": "tooltipPlacement"; "tooltipAppendToBody": "tooltipAppendToBody"; "tooltipDisabled": "tooltipDisabled"; "tooltipDelay": "tooltipDelay"; "customTemplate": "customTemplate"; "eventTitleTemplate": "eventTitleTemplate"; "eventActionsTemplate": "eventActionsTemplate"; "tooltipTemplate": "tooltipTemplate"; "column": "column"; "daysInWeek": "daysInWeek"; }, { "eventClicked": "eventClicked"; }, never, never, false, never>;
}
