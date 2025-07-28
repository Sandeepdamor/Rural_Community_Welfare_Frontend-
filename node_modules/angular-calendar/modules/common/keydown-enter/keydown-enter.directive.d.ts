import { EventEmitter, ElementRef, NgZone, Renderer2, OnInit, OnDestroy } from '@angular/core';
import * as i0 from "@angular/core";
export declare class KeydownEnterDirective implements OnInit, OnDestroy {
    private host;
    private ngZone;
    private renderer;
    keydown: EventEmitter<KeyboardEvent>;
    private keydownListener;
    constructor(host: ElementRef<HTMLElement>, ngZone: NgZone, renderer: Renderer2);
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<KeydownEnterDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<KeydownEnterDirective, "[mwlKeydownEnter]", never, {}, { "keydown": "mwlKeydownEnter"; }, never, never, false, never>;
}
