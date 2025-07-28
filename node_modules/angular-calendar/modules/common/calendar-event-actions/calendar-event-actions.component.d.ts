import { TemplateRef } from '@angular/core';
import { CalendarEvent, EventAction } from 'calendar-utils';
import * as i0 from "@angular/core";
export declare class CalendarEventActionsComponent {
    event: CalendarEvent;
    customTemplate: TemplateRef<any>;
    trackByActionId: (index: number, action: EventAction) => string | number | EventAction;
    static ɵfac: i0.ɵɵFactoryDeclaration<CalendarEventActionsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CalendarEventActionsComponent, "mwl-calendar-event-actions", never, { "event": "event"; "customTemplate": "customTemplate"; }, {}, never, never, false, never>;
}
