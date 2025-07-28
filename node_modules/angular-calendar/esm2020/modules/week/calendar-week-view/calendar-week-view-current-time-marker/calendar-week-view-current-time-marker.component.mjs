import { Component, Input, } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { switchMapTo, startWith, map, switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../../../../date-adapters/date-adapter";
import * as i2 from "@angular/common";
export class CalendarWeekViewCurrentTimeMarkerComponent {
    constructor(dateAdapter, zone) {
        this.dateAdapter = dateAdapter;
        this.zone = zone;
        this.columnDate$ = new BehaviorSubject(undefined);
        this.marker$ = this.zone.onStable.pipe(switchMap(() => interval(60 * 1000)), startWith(0), switchMapTo(this.columnDate$), map((columnDate) => {
            const startOfDay = this.dateAdapter.setMinutes(this.dateAdapter.setHours(columnDate, this.dayStartHour), this.dayStartMinute);
            const endOfDay = this.dateAdapter.setMinutes(this.dateAdapter.setHours(columnDate, this.dayEndHour), this.dayEndMinute);
            const hourHeightModifier = (this.hourSegments * this.hourSegmentHeight) /
                (this.hourDuration || 60);
            const now = new Date();
            return {
                isVisible: this.dateAdapter.isSameDay(columnDate, now) &&
                    now >= startOfDay &&
                    now <= endOfDay,
                top: this.dateAdapter.differenceInMinutes(now, startOfDay) *
                    hourHeightModifier,
            };
        }));
    }
    ngOnChanges(changes) {
        if (changes.columnDate) {
            this.columnDate$.next(changes.columnDate.currentValue);
        }
    }
}
CalendarWeekViewCurrentTimeMarkerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: CalendarWeekViewCurrentTimeMarkerComponent, deps: [{ token: i1.DateAdapter }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
CalendarWeekViewCurrentTimeMarkerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.3", type: CalendarWeekViewCurrentTimeMarkerComponent, selector: "mwl-calendar-week-view-current-time-marker", inputs: { columnDate: "columnDate", dayStartHour: "dayStartHour", dayStartMinute: "dayStartMinute", dayEndHour: "dayEndHour", dayEndMinute: "dayEndMinute", hourSegments: "hourSegments", hourDuration: "hourDuration", hourSegmentHeight: "hourSegmentHeight", customTemplate: "customTemplate" }, usesOnChanges: true, ngImport: i0, template: `
    <ng-template
      #defaultTemplate
      let-columnDate="columnDate"
      let-dayStartHour="dayStartHour"
      let-dayStartMinute="dayStartMinute"
      let-dayEndHour="dayEndHour"
      let-dayEndMinute="dayEndMinute"
      let-isVisible="isVisible"
      let-topPx="topPx"
    >
      <div
        class="cal-current-time-marker"
        *ngIf="isVisible"
        [style.top.px]="topPx"
      ></div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        columnDate: columnDate,
        dayStartHour: dayStartHour,
        dayStartMinute: dayStartMinute,
        dayEndHour: dayEndHour,
        dayEndMinute: dayEndMinute,
        isVisible: (marker$ | async)?.isVisible,
        topPx: (marker$ | async)?.top
      }"
    >
    </ng-template>
  `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: CalendarWeekViewCurrentTimeMarkerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mwl-calendar-week-view-current-time-marker',
                    template: `
    <ng-template
      #defaultTemplate
      let-columnDate="columnDate"
      let-dayStartHour="dayStartHour"
      let-dayStartMinute="dayStartMinute"
      let-dayEndHour="dayEndHour"
      let-dayEndMinute="dayEndMinute"
      let-isVisible="isVisible"
      let-topPx="topPx"
    >
      <div
        class="cal-current-time-marker"
        *ngIf="isVisible"
        [style.top.px]="topPx"
      ></div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        columnDate: columnDate,
        dayStartHour: dayStartHour,
        dayStartMinute: dayStartMinute,
        dayEndHour: dayEndHour,
        dayEndMinute: dayEndMinute,
        isVisible: (marker$ | async)?.isVisible,
        topPx: (marker$ | async)?.top
      }"
    >
    </ng-template>
  `,
                }]
        }], ctorParameters: function () { return [{ type: i1.DateAdapter }, { type: i0.NgZone }]; }, propDecorators: { columnDate: [{
                type: Input
            }], dayStartHour: [{
                type: Input
            }], dayStartMinute: [{
                type: Input
            }], dayEndHour: [{
                type: Input
            }], dayEndMinute: [{
                type: Input
            }], hourSegments: [{
                type: Input
            }], hourDuration: [{
                type: Input
            }], hourSegmentHeight: [{
                type: Input
            }], customTemplate: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItd2Vlay12aWV3LWN1cnJlbnQtdGltZS1tYXJrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1jYWxlbmRhci9zcmMvbW9kdWxlcy93ZWVrL2NhbGVuZGFyLXdlZWstdmlldy9jYWxlbmRhci13ZWVrLXZpZXctY3VycmVudC10aW1lLW1hcmtlci9jYWxlbmRhci13ZWVrLXZpZXctY3VycmVudC10aW1lLW1hcmtlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEdBS04sTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDN0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBcUN4RSxNQUFNLE9BQU8sMENBQTBDO0lBcURyRCxZQUFvQixXQUF3QixFQUFVLElBQVk7UUFBOUMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFRO1FBbENsRSxnQkFBVyxHQUFHLElBQUksZUFBZSxDQUFPLFNBQVMsQ0FBQyxDQUFDO1FBRW5ELFlBQU8sR0FHRixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQzFCLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQ3BDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFDWixXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUM3QixHQUFHLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTtZQUNqQixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FDNUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsRUFDeEQsSUFBSSxDQUFDLGNBQWMsQ0FDcEIsQ0FBQztZQUNGLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUMxQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUN0RCxJQUFJLENBQUMsWUFBWSxDQUNsQixDQUFDO1lBQ0YsTUFBTSxrQkFBa0IsR0FDdEIsQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztnQkFDNUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQzVCLE1BQU0sR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7WUFDdkIsT0FBTztnQkFDTCxTQUFTLEVBQ1AsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQztvQkFDM0MsR0FBRyxJQUFJLFVBQVU7b0JBQ2pCLEdBQUcsSUFBSSxRQUFRO2dCQUNqQixHQUFHLEVBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDO29CQUNyRCxrQkFBa0I7YUFDckIsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUNILENBQUM7SUFFbUUsQ0FBQztJQUV0RSxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDeEQ7SUFDSCxDQUFDOzt1SUEzRFUsMENBQTBDOzJIQUExQywwQ0FBMEMsMllBaEMzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOEJUOzJGQUVVLDBDQUEwQztrQkFsQ3RELFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDRDQUE0QztvQkFDdEQsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4QlQ7aUJBQ0Y7dUhBRVUsVUFBVTtzQkFBbEIsS0FBSztnQkFFRyxZQUFZO3NCQUFwQixLQUFLO2dCQUVHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBRUcsVUFBVTtzQkFBbEIsS0FBSztnQkFFRyxZQUFZO3NCQUFwQixLQUFLO2dCQUVHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBRUcsWUFBWTtzQkFBcEIsS0FBSztnQkFFRyxpQkFBaUI7c0JBQXpCLEtBQUs7Z0JBRUcsY0FBYztzQkFBdEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIGludGVydmFsLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXBUbywgc3RhcnRXaXRoLCBtYXAsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERhdGVBZGFwdGVyIH0gZnJvbSAnLi4vLi4vLi4vLi4vZGF0ZS1hZGFwdGVycy9kYXRlLWFkYXB0ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtd2wtY2FsZW5kYXItd2Vlay12aWV3LWN1cnJlbnQtdGltZS1tYXJrZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgI2RlZmF1bHRUZW1wbGF0ZVxuICAgICAgbGV0LWNvbHVtbkRhdGU9XCJjb2x1bW5EYXRlXCJcbiAgICAgIGxldC1kYXlTdGFydEhvdXI9XCJkYXlTdGFydEhvdXJcIlxuICAgICAgbGV0LWRheVN0YXJ0TWludXRlPVwiZGF5U3RhcnRNaW51dGVcIlxuICAgICAgbGV0LWRheUVuZEhvdXI9XCJkYXlFbmRIb3VyXCJcbiAgICAgIGxldC1kYXlFbmRNaW51dGU9XCJkYXlFbmRNaW51dGVcIlxuICAgICAgbGV0LWlzVmlzaWJsZT1cImlzVmlzaWJsZVwiXG4gICAgICBsZXQtdG9wUHg9XCJ0b3BQeFwiXG4gICAgPlxuICAgICAgPGRpdlxuICAgICAgICBjbGFzcz1cImNhbC1jdXJyZW50LXRpbWUtbWFya2VyXCJcbiAgICAgICAgKm5nSWY9XCJpc1Zpc2libGVcIlxuICAgICAgICBbc3R5bGUudG9wLnB4XT1cInRvcFB4XCJcbiAgICAgID48L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY3VzdG9tVGVtcGxhdGUgfHwgZGVmYXVsdFRlbXBsYXRlXCJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7XG4gICAgICAgIGNvbHVtbkRhdGU6IGNvbHVtbkRhdGUsXG4gICAgICAgIGRheVN0YXJ0SG91cjogZGF5U3RhcnRIb3VyLFxuICAgICAgICBkYXlTdGFydE1pbnV0ZTogZGF5U3RhcnRNaW51dGUsXG4gICAgICAgIGRheUVuZEhvdXI6IGRheUVuZEhvdXIsXG4gICAgICAgIGRheUVuZE1pbnV0ZTogZGF5RW5kTWludXRlLFxuICAgICAgICBpc1Zpc2libGU6IChtYXJrZXIkIHwgYXN5bmMpPy5pc1Zpc2libGUsXG4gICAgICAgIHRvcFB4OiAobWFya2VyJCB8IGFzeW5jKT8udG9wXG4gICAgICB9XCJcbiAgICA+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJXZWVrVmlld0N1cnJlbnRUaW1lTWFya2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgY29sdW1uRGF0ZTogRGF0ZTtcblxuICBASW5wdXQoKSBkYXlTdGFydEhvdXI6IG51bWJlcjtcblxuICBASW5wdXQoKSBkYXlTdGFydE1pbnV0ZTogbnVtYmVyO1xuXG4gIEBJbnB1dCgpIGRheUVuZEhvdXI6IG51bWJlcjtcblxuICBASW5wdXQoKSBkYXlFbmRNaW51dGU6IG51bWJlcjtcblxuICBASW5wdXQoKSBob3VyU2VnbWVudHM6IG51bWJlcjtcblxuICBASW5wdXQoKSBob3VyRHVyYXRpb246IG51bWJlcjtcblxuICBASW5wdXQoKSBob3VyU2VnbWVudEhlaWdodDogbnVtYmVyO1xuXG4gIEBJbnB1dCgpIGN1c3RvbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIGNvbHVtbkRhdGUkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxEYXRlPih1bmRlZmluZWQpO1xuXG4gIG1hcmtlciQ6IE9ic2VydmFibGU8e1xuICAgIGlzVmlzaWJsZTogYm9vbGVhbjtcbiAgICB0b3A6IG51bWJlcjtcbiAgfT4gPSB0aGlzLnpvbmUub25TdGFibGUucGlwZShcbiAgICBzd2l0Y2hNYXAoKCkgPT4gaW50ZXJ2YWwoNjAgKiAxMDAwKSksXG4gICAgc3RhcnRXaXRoKDApLFxuICAgIHN3aXRjaE1hcFRvKHRoaXMuY29sdW1uRGF0ZSQpLFxuICAgIG1hcCgoY29sdW1uRGF0ZSkgPT4ge1xuICAgICAgY29uc3Qgc3RhcnRPZkRheSA9IHRoaXMuZGF0ZUFkYXB0ZXIuc2V0TWludXRlcyhcbiAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5zZXRIb3Vycyhjb2x1bW5EYXRlLCB0aGlzLmRheVN0YXJ0SG91ciksXG4gICAgICAgIHRoaXMuZGF5U3RhcnRNaW51dGVcbiAgICAgICk7XG4gICAgICBjb25zdCBlbmRPZkRheSA9IHRoaXMuZGF0ZUFkYXB0ZXIuc2V0TWludXRlcyhcbiAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5zZXRIb3Vycyhjb2x1bW5EYXRlLCB0aGlzLmRheUVuZEhvdXIpLFxuICAgICAgICB0aGlzLmRheUVuZE1pbnV0ZVxuICAgICAgKTtcbiAgICAgIGNvbnN0IGhvdXJIZWlnaHRNb2RpZmllciA9XG4gICAgICAgICh0aGlzLmhvdXJTZWdtZW50cyAqIHRoaXMuaG91clNlZ21lbnRIZWlnaHQpIC9cbiAgICAgICAgKHRoaXMuaG91ckR1cmF0aW9uIHx8IDYwKTtcbiAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpc1Zpc2libGU6XG4gICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5pc1NhbWVEYXkoY29sdW1uRGF0ZSwgbm93KSAmJlxuICAgICAgICAgIG5vdyA+PSBzdGFydE9mRGF5ICYmXG4gICAgICAgICAgbm93IDw9IGVuZE9mRGF5LFxuICAgICAgICB0b3A6XG4gICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5kaWZmZXJlbmNlSW5NaW51dGVzKG5vdywgc3RhcnRPZkRheSkgKlxuICAgICAgICAgIGhvdXJIZWlnaHRNb2RpZmllcixcbiAgICAgIH07XG4gICAgfSlcbiAgKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGVBZGFwdGVyOiBEYXRlQWRhcHRlciwgcHJpdmF0ZSB6b25lOiBOZ1pvbmUpIHt9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLmNvbHVtbkRhdGUpIHtcbiAgICAgIHRoaXMuY29sdW1uRGF0ZSQubmV4dChjaGFuZ2VzLmNvbHVtbkRhdGUuY3VycmVudFZhbHVlKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==