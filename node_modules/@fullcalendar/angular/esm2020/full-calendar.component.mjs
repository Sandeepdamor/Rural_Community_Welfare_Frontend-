import { Component, ContentChild, Input, ViewEncapsulation, } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import { CustomRenderingStore } from '@fullcalendar/core/internal';
import { OPTION_INPUT_NAMES, OPTION_IS_DEEP } from './options';
import { deepCopy, mapHash } from './utils/obj';
import { deepEqual } from './utils/fast-deep-equal';
import * as i0 from "@angular/core";
import * as i1 from "./utils/offscreen-fragment.component";
import * as i2 from "./utils/transport-container.component";
import * as i3 from "@angular/common";
export class FullCalendarComponent {
    constructor(element, changeDetector) {
        this.element = element;
        this.calendar = null;
        this.optionSnapshot = {}; // for diffing
        this.customRenderingMap = new Map();
        const customRenderingStore = new CustomRenderingStore();
        customRenderingStore.subscribe((customRenderingMap) => {
            this.customRenderingMap = customRenderingMap;
            this.customRenderingArray = undefined; // clear cache
            changeDetector.detectChanges();
        });
        this.handleCustomRendering = customRenderingStore.handle.bind(customRenderingStore);
    }
    ngAfterViewInit() {
        const { deepChangeDetection } = this;
        const options = {
            ...this.options,
            ...this.buildInputOptions(),
        };
        // initialize snapshot
        this.optionSnapshot = mapHash(options, (optionVal, optionName) => ((deepChangeDetection && OPTION_IS_DEEP[optionName])
            ? deepCopy(optionVal)
            : optionVal));
        const calendarEl = this.element.nativeElement;
        const calendar = this.calendar = new Calendar(calendarEl, {
            ...options,
            ...this.buildExtraOptions(),
        });
        // Ionic dimensions hack
        // https://github.com/fullcalendar/fullcalendar/issues/4976
        const ionContent = calendarEl.closest('ion-content');
        if (ionContent && ionContent.componentOnReady) {
            ionContent.componentOnReady().then(() => {
                window.requestAnimationFrame(() => {
                    calendar.render();
                });
            });
        }
        else {
            calendar.render();
        }
        // Angular v19, whether because of new Vite dev environment or not,
        // loads outer elements' styles late, so dimensions might not be final here.
        // Force a size-update after a delay.
        setTimeout(() => calendar.updateSize());
    }
    /*
    allows us to manually detect complex input changes, internal mutations to certain options.
    called before ngOnChanges. called much more often than ngOnChanges.
    */
    ngDoCheck() {
        if (this.calendar) { // not the initial render
            const { deepChangeDetection, optionSnapshot } = this;
            const newOptions = {
                ...this.options,
                ...this.buildInputOptions(),
            };
            const newProcessedOptions = {};
            const changedOptionNames = [];
            // detect adds and updates (and update snapshot)
            for (const optionName in newOptions) {
                if (newOptions.hasOwnProperty(optionName)) {
                    let optionVal = newOptions[optionName];
                    if (deepChangeDetection && OPTION_IS_DEEP[optionName]) {
                        if (!deepEqual(optionSnapshot[optionName], optionVal)) {
                            optionSnapshot[optionName] = deepCopy(optionVal);
                            changedOptionNames.push(optionName);
                        }
                    }
                    else {
                        if (optionSnapshot[optionName] !== optionVal) {
                            optionSnapshot[optionName] = optionVal;
                            changedOptionNames.push(optionName);
                        }
                    }
                    newProcessedOptions[optionName] = optionVal;
                }
            }
            const oldOptionNames = Object.keys(optionSnapshot);
            // detect removals (and update snapshot)
            for (const optionName of oldOptionNames) {
                if (!(optionName in newOptions)) { // doesn't exist in new options?
                    delete optionSnapshot[optionName];
                    changedOptionNames.push(optionName);
                }
            }
            if (changedOptionNames.length) {
                this.calendar.pauseRendering();
                this.calendar.resetOptions({
                    ...newProcessedOptions,
                    ...this.buildExtraOptions(),
                }, changedOptionNames);
            }
        }
    }
    ngAfterContentChecked() {
        if (this.calendar) { // too defensive?
            this.calendar.resumeRendering();
        }
    }
    ngOnDestroy() {
        if (this.calendar) { // too defensive?
            this.calendar.destroy();
            this.calendar = null;
        }
    }
    get customRenderings() {
        return this.customRenderingArray ||
            (this.customRenderingArray = [...this.customRenderingMap.values()]);
    }
    getApi() {
        return this.calendar;
    }
    buildInputOptions() {
        const options = {};
        for (const inputName of OPTION_INPUT_NAMES) {
            const inputValue = this[inputName];
            if (inputValue != null) { // exclude both null and undefined
                options[inputName] = inputValue;
            }
        }
        return options;
    }
    buildExtraOptions() {
        return {
            handleCustomRendering: this.handleCustomRendering,
            customRenderingMetaMap: this,
            customRenderingReplaces: true,
        };
    }
    // for `trackBy` in loop
    trackCustomRendering(index, customRendering) {
        return customRendering.id;
    }
}
FullCalendarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FullCalendarComponent, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
FullCalendarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: FullCalendarComponent, selector: "full-calendar", inputs: { options: "options", deepChangeDetection: "deepChangeDetection", events: "events", eventSources: "eventSources", resources: "resources" }, queries: [{ propertyName: "dayHeaderContent", first: true, predicate: ["dayHeaderContent"], descendants: true, static: true }, { propertyName: "dayCellContent", first: true, predicate: ["dayCellContent"], descendants: true, static: true }, { propertyName: "weekNumberContent", first: true, predicate: ["weekNumberContent"], descendants: true, static: true }, { propertyName: "nowIndicatorContent", first: true, predicate: ["nowIndicatorContent"], descendants: true, static: true }, { propertyName: "eventContent", first: true, predicate: ["eventContent"], descendants: true, static: true }, { propertyName: "slotLaneContent", first: true, predicate: ["slotLaneContent"], descendants: true, static: true }, { propertyName: "slotLabelContent", first: true, predicate: ["slotLabelContent"], descendants: true, static: true }, { propertyName: "allDayContent", first: true, predicate: ["allDayContent"], descendants: true, static: true }, { propertyName: "moreLinkContent", first: true, predicate: ["moreLinkContent"], descendants: true, static: true }, { propertyName: "noEventsContent", first: true, predicate: ["noEventsContent"], descendants: true, static: true }, { propertyName: "resourceAreaHeaderContent", first: true, predicate: ["resourceAreaHeaderContent"], descendants: true, static: true }, { propertyName: "resourceGroupLabelContent", first: true, predicate: ["resourceGroupLabelContent"], descendants: true, static: true }, { propertyName: "resourceLabelContent", first: true, predicate: ["resourceLabelContent"], descendants: true, static: true }, { propertyName: "resourceLaneContent", first: true, predicate: ["resourceLaneContent"], descendants: true, static: true }, { propertyName: "resourceGroupLaneContent", first: true, predicate: ["resourceGroupLaneContent"], descendants: true, static: true }], ngImport: i0, template: "<offscreen-fragment>\n  <transport-container *ngFor=\"let customRendering of customRenderings; trackBy:trackCustomRendering\"\n    [inPlaceOf]=\"customRendering.containerEl\"\n    [reportEl]=\"customRendering.reportNewContainerEl\"\n    [elTag]=\"customRendering.elTag\"\n    [elClasses]=\"customRendering.elClasses\"\n    [elStyle]=\"customRendering.elStyle\"\n    [elAttrs]=\"customRendering.elAttrs\"\n    [template]=\"customRendering.generatorMeta\"\n    [renderProps]=\"customRendering.renderProps\"\n  ></transport-container>\n</offscreen-fragment>\n", components: [{ type: i1.OffscreenFragmentComponent, selector: "offscreen-fragment" }, { type: i2.TransportContainerComponent, selector: "transport-container", inputs: ["inPlaceOf", "reportEl", "elTag", "elClasses", "elStyle", "elAttrs", "template", "renderProps"] }], directives: [{ type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FullCalendarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'full-calendar', encapsulation: ViewEncapsulation.None // the styles are root-level, not scoped within the component
                    , template: "<offscreen-fragment>\n  <transport-container *ngFor=\"let customRendering of customRenderings; trackBy:trackCustomRendering\"\n    [inPlaceOf]=\"customRendering.containerEl\"\n    [reportEl]=\"customRendering.reportNewContainerEl\"\n    [elTag]=\"customRendering.elTag\"\n    [elClasses]=\"customRendering.elClasses\"\n    [elStyle]=\"customRendering.elStyle\"\n    [elAttrs]=\"customRendering.elAttrs\"\n    [template]=\"customRendering.generatorMeta\"\n    [renderProps]=\"customRendering.renderProps\"\n  ></transport-container>\n</offscreen-fragment>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { options: [{
                type: Input
            }], deepChangeDetection: [{
                type: Input
            }], events: [{
                type: Input
            }], eventSources: [{
                type: Input
            }], resources: [{
                type: Input
            }], dayHeaderContent: [{
                type: ContentChild,
                args: ['dayHeaderContent', { static: true }]
            }], dayCellContent: [{
                type: ContentChild,
                args: ['dayCellContent', { static: true }]
            }], weekNumberContent: [{
                type: ContentChild,
                args: ['weekNumberContent', { static: true }]
            }], nowIndicatorContent: [{
                type: ContentChild,
                args: ['nowIndicatorContent', { static: true }]
            }], eventContent: [{
                type: ContentChild,
                args: ['eventContent', { static: true }]
            }], slotLaneContent: [{
                type: ContentChild,
                args: ['slotLaneContent', { static: true }]
            }], slotLabelContent: [{
                type: ContentChild,
                args: ['slotLabelContent', { static: true }]
            }], allDayContent: [{
                type: ContentChild,
                args: ['allDayContent', { static: true }]
            }], moreLinkContent: [{
                type: ContentChild,
                args: ['moreLinkContent', { static: true }]
            }], noEventsContent: [{
                type: ContentChild,
                args: ['noEventsContent', { static: true }]
            }], resourceAreaHeaderContent: [{
                type: ContentChild,
                args: ['resourceAreaHeaderContent', { static: true }]
            }], resourceGroupLabelContent: [{
                type: ContentChild,
                args: ['resourceGroupLabelContent', { static: true }]
            }], resourceLabelContent: [{
                type: ContentChild,
                args: ['resourceLabelContent', { static: true }]
            }], resourceLaneContent: [{
                type: ContentChild,
                args: ['resourceLaneContent', { static: true }]
            }], resourceGroupLaneContent: [{
                type: ContentChild,
                args: ['resourceGroupLaneContent', { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVsbC1jYWxlbmRhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc3JjL2Z1bGwtY2FsZW5kYXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vbGliL3NyYy9mdWxsLWNhbGVuZGFyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUdaLEtBQUssRUFLTCxpQkFBaUIsR0FFbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFFBQVEsRUFBbUIsTUFBTSxvQkFBb0IsQ0FBQztBQUMvRCxPQUFPLEVBQW1CLG9CQUFvQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDcEYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLGNBQWMsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUUvRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNoRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7O0FBT3BELE1BQU0sT0FBTyxxQkFBcUI7SUFxQ2hDLFlBQ1UsT0FBbUIsRUFDM0IsY0FBaUM7UUFEekIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQVByQixhQUFRLEdBQW9CLElBQUksQ0FBQztRQUNqQyxtQkFBYyxHQUF3QixFQUFFLENBQUMsQ0FBQyxjQUFjO1FBRXhELHVCQUFrQixHQUFHLElBQUksR0FBRyxFQUFnQyxDQUFBO1FBT2xFLE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxvQkFBb0IsRUFBRSxDQUFDO1FBRXhELG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxDQUFDLGtCQUFrQixFQUFFLEVBQUU7WUFDcEQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDO1lBQzdDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxTQUFTLENBQUMsQ0FBQyxjQUFjO1lBQ3JELGNBQWMsQ0FBQyxhQUFhLEVBQUUs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LElBQUksRUFBRTtnQkFDTyx3QkFBd0I7c0JBQW5GLFlBQVk7dUJBQUMsMEJBQTBCLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIFRlbXBsYXRlUmVmLFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgRG9DaGVjayxcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbiAgT25EZXN0cm95LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FsZW5kYXIsIENhbGVuZGFyT3B0aW9ucyB9IGZyb20gJ0BmdWxsY2FsZW5kYXIvY29yZSc7XG5pbXBvcnQgeyBDdXN0b21SZW5kZXJpbmcsIEN1c3RvbVJlbmRlcmluZ1N0b3JlIH0gZnJvbSAnQGZ1bGxjYWxlbmRhci9jb3JlL2ludGVybmFsJztcbmltcG9ydCB7IE9QVElPTl9JTlBVVF9OQU1FUywgT1BUSU9OX0lTX0RFRVAgfSBmcm9tICcuL29wdGlvbnMnO1xuaW1wb3J0IHsgQ2FsZW5kYXJPcHRpb24sIENhbGVuZGFyVGVtcGxhdGVSZWYgfSBmcm9tICcuL3ByaXZhdGUtdHlwZXMnO1xuaW1wb3J0IHsgZGVlcENvcHksIG1hcEhhc2ggfSBmcm9tICcuL3V0aWxzL29iaic7XG5pbXBvcnQgeyBkZWVwRXF1YWwgfSBmcm9tICcuL3V0aWxzL2Zhc3QtZGVlcC1lcXVhbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Z1bGwtY2FsZW5kYXInLFxuICB0ZW1wbGF0ZVVybDogJy4vZnVsbC1jYWxlbmRhci5jb21wb25lbnQuaHRtbCcsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUgLy8gdGhlIHN0eWxlcyBhcmUgcm9vdC1sZXZlbCwgbm90IHNjb3BlZCB3aXRoaW4gdGhlIGNvbXBvbmVudFxufSlcbmV4cG9ydCBjbGFzcyBGdWxsQ2FsZW5kYXJDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBEb0NoZWNrLCBBZnRlckNvbnRlbnRDaGVja2VkLCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBvcHRpb25zPzogQ2FsZW5kYXJPcHRpb25zO1xuICBASW5wdXQoKSBkZWVwQ2hhbmdlRGV0ZWN0aW9uPzogYm9vbGVhbjtcblxuICAvKlxuICBPcHRpb25zIGFzIGluZGl2aWR1YWwgSW5wdXRzXG4gIE5PVEU6IGtlZXAgaW4gc3luYyB3aXRoIE9QVElPTl9JTlBVVF9OQU1FU1xuICAqL1xuICBASW5wdXQoKSBldmVudHM/OiBDYWxlbmRhck9wdGlvbjwnZXZlbnRzJz4gfCBudWxsIHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKSBldmVudFNvdXJjZXM/OiBDYWxlbmRhck9wdGlvbjwnZXZlbnRTb3VyY2VzJz4gfCBudWxsIHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKSByZXNvdXJjZXM/OiBDYWxlbmRhck9wdGlvbjwncmVzb3VyY2VzJz4gfCBudWxsIHwgdW5kZWZpbmVkO1xuXG4gIC8qXG4gIFRlbXBsYXRlc1xuICAqL1xuICBAQ29udGVudENoaWxkKCdkYXlIZWFkZXJDb250ZW50JywgeyBzdGF0aWM6IHRydWUgfSkgZGF5SGVhZGVyQ29udGVudD86IENhbGVuZGFyVGVtcGxhdGVSZWY8J2RheUhlYWRlckNvbnRlbnQnPjtcbiAgQENvbnRlbnRDaGlsZCgnZGF5Q2VsbENvbnRlbnQnLCB7IHN0YXRpYzogdHJ1ZSB9KSBkYXlDZWxsQ29udGVudD86IENhbGVuZGFyVGVtcGxhdGVSZWY8J2RheUNlbGxDb250ZW50Jz47XG4gIEBDb250ZW50Q2hpbGQoJ3dlZWtOdW1iZXJDb250ZW50JywgeyBzdGF0aWM6IHRydWUgfSkgd2Vla051bWJlckNvbnRlbnQ/OiBDYWxlbmRhclRlbXBsYXRlUmVmPCd3ZWVrTnVtYmVyQ29udGVudCc+O1xuICBAQ29udGVudENoaWxkKCdub3dJbmRpY2F0b3JDb250ZW50JywgeyBzdGF0aWM6IHRydWUgfSkgbm93SW5kaWNhdG9yQ29udGVudD86IENhbGVuZGFyVGVtcGxhdGVSZWY8J25vd0luZGljYXRvckNvbnRlbnQnPjtcbiAgQENvbnRlbnRDaGlsZCgnZXZlbnRDb250ZW50JywgeyBzdGF0aWM6IHRydWUgfSkgZXZlbnRDb250ZW50PzogQ2FsZW5kYXJUZW1wbGF0ZVJlZjwnZXZlbnRDb250ZW50Jz47XG4gIEBDb250ZW50Q2hpbGQoJ3Nsb3RMYW5lQ29udGVudCcsIHsgc3RhdGljOiB0cnVlIH0pIHNsb3RMYW5lQ29udGVudD86IENhbGVuZGFyVGVtcGxhdGVSZWY8J3Nsb3RMYW5lQ29udGVudCc+O1xuICBAQ29udGVudENoaWxkKCdzbG90TGFiZWxDb250ZW50JywgeyBzdGF0aWM6IHRydWUgfSkgc2xvdExhYmVsQ29udGVudD86IENhbGVuZGFyVGVtcGxhdGVSZWY8J3Nsb3RMYWJlbENvbnRlbnQnPjtcbiAgQENvbnRlbnRDaGlsZCgnYWxsRGF5Q29udGVudCcsIHsgc3RhdGljOiB0cnVlIH0pIGFsbERheUNvbnRlbnQ/OiBDYWxlbmRhclRlbXBsYXRlUmVmPCdhbGxEYXlDb250ZW50Jz47XG4gIEBDb250ZW50Q2hpbGQoJ21vcmVMaW5rQ29udGVudCcsIHsgc3RhdGljOiB0cnVlIH0pIG1vcmVMaW5rQ29udGVudD86IENhbGVuZGFyVGVtcGxhdGVSZWY8J21vcmVMaW5rQ29udGVudCc+O1xuICBAQ29udGVudENoaWxkKCdub0V2ZW50c0NvbnRlbnQnLCB7IHN0YXRpYzogdHJ1ZSB9KSBub0V2ZW50c0NvbnRlbnQ/OiBDYWxlbmRhclRlbXBsYXRlUmVmPCdub0V2ZW50c0NvbnRlbnQnPjtcbiAgQENvbnRlbnRDaGlsZCgncmVzb3VyY2VBcmVhSGVhZGVyQ29udGVudCcsIHsgc3RhdGljOiB0cnVlIH0pIHJlc291cmNlQXJlYUhlYWRlckNvbnRlbnQ/OiBDYWxlbmRhclRlbXBsYXRlUmVmPCdyZXNvdXJjZUFyZWFIZWFkZXJDb250ZW50Jz47XG4gIEBDb250ZW50Q2hpbGQoJ3Jlc291cmNlR3JvdXBMYWJlbENvbnRlbnQnLCB7IHN0YXRpYzogdHJ1ZSB9KSByZXNvdXJjZUdyb3VwTGFiZWxDb250ZW50PzogQ2FsZW5kYXJUZW1wbGF0ZVJlZjwncmVzb3VyY2VHcm91cExhYmVsQ29udGVudCc+O1xuICBAQ29udGVudENoaWxkKCdyZXNvdXJjZUxhYmVsQ29udGVudCcsIHsgc3RhdGljOiB0cnVlIH0pIHJlc291cmNlTGFiZWxDb250ZW50PzogQ2FsZW5kYXJUZW1wbGF0ZVJlZjwncmVzb3VyY2VMYWJlbENvbnRlbnQnPjtcbiAgQENvbnRlbnRDaGlsZCgncmVzb3VyY2VMYW5lQ29udGVudCcsIHsgc3RhdGljOiB0cnVlIH0pIHJlc291cmNlTGFuZUNvbnRlbnQ/OiBDYWxlbmRhclRlbXBsYXRlUmVmPCdyZXNvdXJjZUxhbmVDb250ZW50Jz47XG4gIEBDb250ZW50Q2hpbGQoJ3Jlc291cmNlR3JvdXBMYW5lQ29udGVudCcsIHsgc3RhdGljOiB0cnVlIH0pIHJlc291cmNlR3JvdXBMYW5lQ29udGVudD86IENhbGVuZGFyVGVtcGxhdGVSZWY8J3Jlc291cmNlR3JvdXBMYW5lQ29udGVudCc+O1xuXG4gIHByaXZhdGUgY2FsZW5kYXI6IENhbGVuZGFyIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgb3B0aW9uU25hcHNob3Q6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7fTsgLy8gZm9yIGRpZmZpbmdcbiAgcHJpdmF0ZSBoYW5kbGVDdXN0b21SZW5kZXJpbmc6IChjdXN0b21SZW5kZXJpbmc6IEN1c3RvbVJlbmRlcmluZzxhbnk+KSA9PiB2b2lkXG4gIHByaXZhdGUgY3VzdG9tUmVuZGVyaW5nTWFwID0gbmV3IE1hcDxzdHJpbmcsIEN1c3RvbVJlbmRlcmluZzxhbnk+PigpXG4gIHByaXZhdGUgY3VzdG9tUmVuZGVyaW5nQXJyYXk/OiBDdXN0b21SZW5kZXJpbmc8YW55PltdXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHtcbiAgICBjb25zdCBjdXN0b21SZW5kZXJpbmdTdG9yZSA9IG5ldyBDdXN0b21SZW5kZXJpbmdTdG9yZSgpO1xuXG4gICAgY3VzdG9tUmVuZGVyaW5nU3RvcmUuc3Vic2NyaWJlKChjdXN0b21SZW5kZXJpbmdNYXApID0+IHtcbiAgICAgIHRoaXMuY3VzdG9tUmVuZGVyaW5nTWFwID0gY3VzdG9tUmVuZGVyaW5nTWFwO1xuICAgICAgdGhpcy5jdXN0b21SZW5kZXJpbmdBcnJheSA9IHVuZGVmaW5lZDsgLy8gY2xlYXIgY2FjaGVcbiAgICAgIGNoYW5nZURldGVjdG9yLmRldGVjdENoYW5nZXMoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuaGFuZGxlQ3VzdG9tUmVuZGVyaW5nID0gY3VzdG9tUmVuZGVyaW5nU3RvcmUuaGFuZGxlLmJpbmQoY3VzdG9tUmVuZGVyaW5nU3RvcmUpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGNvbnN0IHsgZGVlcENoYW5nZURldGVjdGlvbiB9ID0gdGhpcztcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgLi4udGhpcy5vcHRpb25zLFxuICAgICAgLi4udGhpcy5idWlsZElucHV0T3B0aW9ucygpLFxuICAgIH07XG5cbiAgICAvLyBpbml0aWFsaXplIHNuYXBzaG90XG4gICAgdGhpcy5vcHRpb25TbmFwc2hvdCA9IG1hcEhhc2gob3B0aW9ucywgKG9wdGlvblZhbDogYW55LCBvcHRpb25OYW1lOiBzdHJpbmcpID0+IChcbiAgICAgIChkZWVwQ2hhbmdlRGV0ZWN0aW9uICYmIE9QVElPTl9JU19ERUVQW29wdGlvbk5hbWVdKVxuICAgICAgICA/IGRlZXBDb3B5KG9wdGlvblZhbClcbiAgICAgICAgOiBvcHRpb25WYWxcbiAgICApKTtcblxuICAgIGNvbnN0IGNhbGVuZGFyRWwgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudFxuICAgIGNvbnN0IGNhbGVuZGFyID0gdGhpcy5jYWxlbmRhciA9IG5ldyBDYWxlbmRhcihjYWxlbmRhckVsLCB7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgLi4udGhpcy5idWlsZEV4dHJhT3B0aW9ucygpLFxuICAgIH0pO1xuXG4gICAgLy8gSW9uaWMgZGltZW5zaW9ucyBoYWNrXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2Z1bGxjYWxlbmRhci9mdWxsY2FsZW5kYXIvaXNzdWVzLzQ5NzZcbiAgICBjb25zdCBpb25Db250ZW50ID0gY2FsZW5kYXJFbC5jbG9zZXN0KCdpb24tY29udGVudCcpXG4gICAgaWYgKGlvbkNvbnRlbnQgJiYgaW9uQ29udGVudC5jb21wb25lbnRPblJlYWR5KSB7XG4gICAgICBpb25Db250ZW50LmNvbXBvbmVudE9uUmVhZHkoKS50aGVuKCgpID0+IHtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgY2FsZW5kYXIucmVuZGVyKClcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGVuZGFyLnJlbmRlcigpXG4gICAgfVxuXG4gICAgLy8gQW5ndWxhciB2MTksIHdoZXRoZXIgYmVjYXVzZSBvZiBuZXcgVml0ZSBkZXYgZW52aXJvbm1lbnQgb3Igbm90LFxuICAgIC8vIGxvYWRzIG91dGVyIGVsZW1lbnRzJyBzdHlsZXMgbGF0ZSwgc28gZGltZW5zaW9ucyBtaWdodCBub3QgYmUgZmluYWwgaGVyZS5cbiAgICAvLyBGb3JjZSBhIHNpemUtdXBkYXRlIGFmdGVyIGEgZGVsYXkuXG4gICAgc2V0VGltZW91dCgoKSA9PiBjYWxlbmRhci51cGRhdGVTaXplKCkpXG4gIH1cblxuICAvKlxuICBhbGxvd3MgdXMgdG8gbWFudWFsbHkgZGV0ZWN0IGNvbXBsZXggaW5wdXQgY2hhbmdlcywgaW50ZXJuYWwgbXV0YXRpb25zIHRvIGNlcnRhaW4gb3B0aW9ucy5cbiAgY2FsbGVkIGJlZm9yZSBuZ09uQ2hhbmdlcy4gY2FsbGVkIG11Y2ggbW9yZSBvZnRlbiB0aGFuIG5nT25DaGFuZ2VzLlxuICAqL1xuICBuZ0RvQ2hlY2soKSB7XG4gICAgaWYgKHRoaXMuY2FsZW5kYXIpIHsgLy8gbm90IHRoZSBpbml0aWFsIHJlbmRlclxuICAgICAgY29uc3QgeyBkZWVwQ2hhbmdlRGV0ZWN0aW9uLCBvcHRpb25TbmFwc2hvdCB9ID0gdGhpcztcbiAgICAgIGNvbnN0IG5ld09wdGlvbnMgPSB7XG4gICAgICAgIC4uLnRoaXMub3B0aW9ucyxcbiAgICAgICAgLi4udGhpcy5idWlsZElucHV0T3B0aW9ucygpLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IG5ld1Byb2Nlc3NlZE9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7fTtcbiAgICAgIGNvbnN0IGNoYW5nZWRPcHRpb25OYW1lczogc3RyaW5nW10gPSBbXVxuXG4gICAgICAvLyBkZXRlY3QgYWRkcyBhbmQgdXBkYXRlcyAoYW5kIHVwZGF0ZSBzbmFwc2hvdClcbiAgICAgIGZvciAoY29uc3Qgb3B0aW9uTmFtZSBpbiBuZXdPcHRpb25zKSB7XG4gICAgICAgIGlmIChuZXdPcHRpb25zLmhhc093blByb3BlcnR5KG9wdGlvbk5hbWUpKSB7XG4gICAgICAgICAgbGV0IG9wdGlvblZhbCA9IG5ld09wdGlvbnNbb3B0aW9uTmFtZSBhcyBrZXlvZiBDYWxlbmRhck9wdGlvbnNdO1xuXG4gICAgICAgICAgaWYgKGRlZXBDaGFuZ2VEZXRlY3Rpb24gJiYgT1BUSU9OX0lTX0RFRVBbb3B0aW9uTmFtZV0pIHtcbiAgICAgICAgICAgIGlmICghZGVlcEVxdWFsKG9wdGlvblNuYXBzaG90W29wdGlvbk5hbWVdLCBvcHRpb25WYWwpKSB7XG4gICAgICAgICAgICAgIG9wdGlvblNuYXBzaG90W29wdGlvbk5hbWVdID0gZGVlcENvcHkob3B0aW9uVmFsKTtcbiAgICAgICAgICAgICAgY2hhbmdlZE9wdGlvbk5hbWVzLnB1c2gob3B0aW9uTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25TbmFwc2hvdFtvcHRpb25OYW1lXSAhPT0gb3B0aW9uVmFsKSB7XG4gICAgICAgICAgICAgIG9wdGlvblNuYXBzaG90W29wdGlvbk5hbWVdID0gb3B0aW9uVmFsO1xuICAgICAgICAgICAgICBjaGFuZ2VkT3B0aW9uTmFtZXMucHVzaChvcHRpb25OYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXdQcm9jZXNzZWRPcHRpb25zW29wdGlvbk5hbWVdID0gb3B0aW9uVmFsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG9sZE9wdGlvbk5hbWVzID0gT2JqZWN0LmtleXMob3B0aW9uU25hcHNob3QpO1xuXG4gICAgICAvLyBkZXRlY3QgcmVtb3ZhbHMgKGFuZCB1cGRhdGUgc25hcHNob3QpXG4gICAgICBmb3IgKGNvbnN0IG9wdGlvbk5hbWUgb2Ygb2xkT3B0aW9uTmFtZXMpIHtcbiAgICAgICAgaWYgKCEob3B0aW9uTmFtZSBpbiBuZXdPcHRpb25zKSkgeyAvLyBkb2Vzbid0IGV4aXN0IGluIG5ldyBvcHRpb25zP1xuICAgICAgICAgIGRlbGV0ZSBvcHRpb25TbmFwc2hvdFtvcHRpb25OYW1lXTtcbiAgICAgICAgICBjaGFuZ2VkT3B0aW9uTmFtZXMucHVzaChvcHRpb25OYW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoY2hhbmdlZE9wdGlvbk5hbWVzLmxlbmd0aCkge1xuICAgICAgICB0aGlzLmNhbGVuZGFyLnBhdXNlUmVuZGVyaW5nKCk7XG4gICAgICAgIHRoaXMuY2FsZW5kYXIucmVzZXRPcHRpb25zKHtcbiAgICAgICAgICAuLi5uZXdQcm9jZXNzZWRPcHRpb25zLFxuICAgICAgICAgIC4uLnRoaXMuYnVpbGRFeHRyYU9wdGlvbnMoKSxcbiAgICAgICAgfSwgY2hhbmdlZE9wdGlvbk5hbWVzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgaWYgKHRoaXMuY2FsZW5kYXIpIHsgLy8gdG9vIGRlZmVuc2l2ZT9cbiAgICAgIHRoaXMuY2FsZW5kYXIucmVzdW1lUmVuZGVyaW5nKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuY2FsZW5kYXIpIHsgLy8gdG9vIGRlZmVuc2l2ZT9cbiAgICAgIHRoaXMuY2FsZW5kYXIuZGVzdHJveSgpO1xuICAgICAgdGhpcy5jYWxlbmRhciA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGN1c3RvbVJlbmRlcmluZ3MoKTogQ3VzdG9tUmVuZGVyaW5nPGFueT5bXSB7XG4gICAgcmV0dXJuIHRoaXMuY3VzdG9tUmVuZGVyaW5nQXJyYXkgfHxcbiAgICAgICh0aGlzLmN1c3RvbVJlbmRlcmluZ0FycmF5ID0gWy4uLnRoaXMuY3VzdG9tUmVuZGVyaW5nTWFwLnZhbHVlcygpXSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0QXBpKCk6IENhbGVuZGFyIHtcbiAgICByZXR1cm4gdGhpcy5jYWxlbmRhciE7XG4gIH1cblxuICBwcml2YXRlIGJ1aWxkSW5wdXRPcHRpb25zKCk6IENhbGVuZGFyT3B0aW9ucyB7XG4gICAgY29uc3Qgb3B0aW9uczogQ2FsZW5kYXJPcHRpb25zID0ge31cblxuICAgIGZvciAoY29uc3QgaW5wdXROYW1lIG9mIE9QVElPTl9JTlBVVF9OQU1FUykge1xuICAgICAgY29uc3QgaW5wdXRWYWx1ZSA9ICh0aGlzIGFzIGFueSlbaW5wdXROYW1lXTtcblxuICAgICAgaWYgKGlucHV0VmFsdWUgIT0gbnVsbCkgeyAvLyBleGNsdWRlIGJvdGggbnVsbCBhbmQgdW5kZWZpbmVkXG4gICAgICAgIChvcHRpb25zIGFzIGFueSlbaW5wdXROYW1lXSA9IGlucHV0VmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH1cblxuICBwcml2YXRlIGJ1aWxkRXh0cmFPcHRpb25zKCk6IENhbGVuZGFyT3B0aW9ucyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGhhbmRsZUN1c3RvbVJlbmRlcmluZzogdGhpcy5oYW5kbGVDdXN0b21SZW5kZXJpbmcsXG4gICAgICBjdXN0b21SZW5kZXJpbmdNZXRhTWFwOiB0aGlzIGFzIHVua25vd24gYXMgeyBbdGVtcGxhdGVOYW1lOiBzdHJpbmddOiBUZW1wbGF0ZVJlZjxhbnk+IH0sXG4gICAgICBjdXN0b21SZW5kZXJpbmdSZXBsYWNlczogdHJ1ZSxcbiAgICB9O1xuICB9XG5cbiAgLy8gZm9yIGB0cmFja0J5YCBpbiBsb29wXG4gIHRyYWNrQ3VzdG9tUmVuZGVyaW5nKGluZGV4OiBudW1iZXIsIGN1c3RvbVJlbmRlcmluZzogQ3VzdG9tUmVuZGVyaW5nPGFueT4pOiBhbnkge1xuICAgIHJldHVybiBjdXN0b21SZW5kZXJpbmcuaWRcbiAgfVxufVxuIiwiPG9mZnNjcmVlbi1mcmFnbWVudD5cbiAgPHRyYW5zcG9ydC1jb250YWluZXIgKm5nRm9yPVwibGV0IGN1c3RvbVJlbmRlcmluZyBvZiBjdXN0b21SZW5kZXJpbmdzOyB0cmFja0J5OnRyYWNrQ3VzdG9tUmVuZGVyaW5nXCJcbiAgICBbaW5QbGFjZU9mXT1cImN1c3RvbVJlbmRlcmluZy5jb250YWluZXJFbFwiXG4gICAgW3JlcG9ydEVsXT1cImN1c3RvbVJlbmRlcmluZy5yZXBvcnROZXdDb250YWluZXJFbFwiXG4gICAgW2VsVGFnXT1cImN1c3RvbVJlbmRlcmluZy5lbFRhZ1wiXG4gICAgW2VsQ2xhc3Nlc109XCJjdXN0b21SZW5kZXJpbmcuZWxDbGFzc2VzXCJcbiAgICBbZWxTdHlsZV09XCJjdXN0b21SZW5kZXJpbmcuZWxTdHlsZVwiXG4gICAgW2VsQXR0cnNdPVwiY3VzdG9tUmVuZGVyaW5nLmVsQXR0cnNcIlxuICAgIFt0ZW1wbGF0ZV09XCJjdXN0b21SZW5kZXJpbmcuZ2VuZXJhdG9yTWV0YVwiXG4gICAgW3JlbmRlclByb3BzXT1cImN1c3RvbVJlbmRlcmluZy5yZW5kZXJQcm9wc1wiXG4gID48L3RyYW5zcG9ydC1jb250YWluZXI+XG48L29mZnNjcmVlbi1mcmFnbWVudD5cbiJdfQ==