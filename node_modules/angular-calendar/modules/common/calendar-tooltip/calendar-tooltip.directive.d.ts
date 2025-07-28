import { OnDestroy, Injector, ComponentFactoryResolver, ViewContainerRef, ElementRef, Renderer2, TemplateRef, OnChanges, SimpleChanges } from '@angular/core';
import { PlacementArray } from 'positioning';
import { CalendarEvent } from 'calendar-utils';
import * as i0 from "@angular/core";
export declare class CalendarTooltipWindowComponent {
    contents: string;
    placement: string;
    event: CalendarEvent;
    customTemplate: TemplateRef<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CalendarTooltipWindowComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CalendarTooltipWindowComponent, "mwl-calendar-tooltip-window", never, { "contents": "contents"; "placement": "placement"; "event": "event"; "customTemplate": "customTemplate"; }, {}, never, never, false, never>;
}
export declare class CalendarTooltipDirective implements OnDestroy, OnChanges {
    private elementRef;
    private injector;
    private renderer;
    private viewContainerRef;
    private document;
    contents: string;
    placement: PlacementArray;
    customTemplate: TemplateRef<any>;
    event: CalendarEvent;
    appendToBody: boolean;
    delay: number | null;
    private tooltipFactory;
    private tooltipRef;
    private cancelTooltipDelay$;
    constructor(elementRef: ElementRef, injector: Injector, renderer: Renderer2, componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef, document: any);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    onMouseOver(): void;
    onMouseOut(): void;
    private show;
    private hide;
    private positionTooltip;
    static ɵfac: i0.ɵɵFactoryDeclaration<CalendarTooltipDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<CalendarTooltipDirective, "[mwlCalendarTooltip]", never, { "contents": "mwlCalendarTooltip"; "placement": "tooltipPlacement"; "customTemplate": "tooltipTemplate"; "event": "tooltipEvent"; "appendToBody": "tooltipAppendToBody"; "delay": "tooltipDelay"; }, {}, never, never, false, never>;
}
