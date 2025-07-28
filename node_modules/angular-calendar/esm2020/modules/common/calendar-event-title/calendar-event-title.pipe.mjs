import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../calendar-event-title-formatter/calendar-event-title-formatter.provider";
export class CalendarEventTitlePipe {
    constructor(calendarEventTitle) {
        this.calendarEventTitle = calendarEventTitle;
    }
    transform(title, titleType, event) {
        return this.calendarEventTitle[titleType](event, title);
    }
}
CalendarEventTitlePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: CalendarEventTitlePipe, deps: [{ token: i1.CalendarEventTitleFormatter }], target: i0.ɵɵFactoryTarget.Pipe });
CalendarEventTitlePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "15.0.3", ngImport: i0, type: CalendarEventTitlePipe, name: "calendarEventTitle" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: CalendarEventTitlePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'calendarEventTitle',
                }]
        }], ctorParameters: function () { return [{ type: i1.CalendarEventTitleFormatter }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZXZlbnQtdGl0bGUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItY2FsZW5kYXIvc3JjL21vZHVsZXMvY29tbW9uL2NhbGVuZGFyLWV2ZW50LXRpdGxlL2NhbGVuZGFyLWV2ZW50LXRpdGxlLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7OztBQU9wRCxNQUFNLE9BQU8sc0JBQXNCO0lBQ2pDLFlBQW9CLGtCQUErQztRQUEvQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQTZCO0lBQUcsQ0FBQztJQUV2RSxTQUFTLENBQUMsS0FBYSxFQUFFLFNBQWlCLEVBQUUsS0FBb0I7UUFDOUQsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzFELENBQUM7O21IQUxVLHNCQUFzQjtpSEFBdEIsc0JBQXNCOzJGQUF0QixzQkFBc0I7a0JBSGxDLElBQUk7bUJBQUM7b0JBQ0osSUFBSSxFQUFFLG9CQUFvQjtpQkFDM0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYWxlbmRhckV2ZW50IH0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xuaW1wb3J0IHsgQ2FsZW5kYXJFdmVudFRpdGxlRm9ybWF0dGVyIH0gZnJvbSAnLi4vY2FsZW5kYXItZXZlbnQtdGl0bGUtZm9ybWF0dGVyL2NhbGVuZGFyLWV2ZW50LXRpdGxlLWZvcm1hdHRlci5wcm92aWRlcic7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2NhbGVuZGFyRXZlbnRUaXRsZScsXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyRXZlbnRUaXRsZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYWxlbmRhckV2ZW50VGl0bGU6IENhbGVuZGFyRXZlbnRUaXRsZUZvcm1hdHRlcikge31cblxuICB0cmFuc2Zvcm0odGl0bGU6IHN0cmluZywgdGl0bGVUeXBlOiBzdHJpbmcsIGV2ZW50OiBDYWxlbmRhckV2ZW50KTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jYWxlbmRhckV2ZW50VGl0bGVbdGl0bGVUeXBlXShldmVudCwgdGl0bGUpO1xuICB9XG59XG4iXX0=