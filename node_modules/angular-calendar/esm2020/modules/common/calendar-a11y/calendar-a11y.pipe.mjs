import { Pipe, LOCALE_ID, Inject } from '@angular/core';
import { CalendarA11y } from './calendar-a11y.provider';
import * as i0 from "@angular/core";
import * as i1 from "./calendar-a11y.provider";
/**
 * This pipe is primarily for rendering aria labels. Example usage:
 * ```typescript
 * // where `myEvent` is a `CalendarEvent` and myLocale is a locale identifier
 * {{ { event: myEvent, locale: myLocale } | calendarA11y: 'eventDescription' }}
 * ```
 */
export class CalendarA11yPipe {
    constructor(calendarA11y, locale) {
        this.calendarA11y = calendarA11y;
        this.locale = locale;
    }
    transform(a11yParams, method) {
        a11yParams.locale = a11yParams.locale || this.locale;
        if (typeof this.calendarA11y[method] === 'undefined') {
            const allowedMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(CalendarA11y.prototype)).filter((iMethod) => iMethod !== 'constructor');
            throw new Error(`${method} is not a valid a11y method. Can only be one of ${allowedMethods.join(', ')}`);
        }
        return this.calendarA11y[method](a11yParams);
    }
}
CalendarA11yPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: CalendarA11yPipe, deps: [{ token: i1.CalendarA11y }, { token: LOCALE_ID }], target: i0.ɵɵFactoryTarget.Pipe });
CalendarA11yPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "15.0.3", ngImport: i0, type: CalendarA11yPipe, name: "calendarA11y" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: CalendarA11yPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'calendarA11y',
                }]
        }], ctorParameters: function () { return [{ type: i1.CalendarA11y }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [LOCALE_ID]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItYTExeS5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1jYWxlbmRhci9zcmMvbW9kdWxlcy9jb21tb24vY2FsZW5kYXItYTExeS9jYWxlbmRhci1hMTF5LnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7OztBQUd4RDs7Ozs7O0dBTUc7QUFJSCxNQUFNLE9BQU8sZ0JBQWdCO0lBQzNCLFlBQ1UsWUFBMEIsRUFDUCxNQUFjO1FBRGpDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQ1AsV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUN4QyxDQUFDO0lBRUosU0FBUyxDQUFDLFVBQXNCLEVBQUUsTUFBYztRQUM5QyxVQUFVLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNyRCxJQUFJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxXQUFXLEVBQUU7WUFDcEQsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixDQUMvQyxNQUFNLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FDOUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sS0FBSyxhQUFhLENBQUMsQ0FBQztZQUNqRCxNQUFNLElBQUksS0FBSyxDQUNiLEdBQUcsTUFBTSxtREFBbUQsY0FBYyxDQUFDLElBQUksQ0FDN0UsSUFBSSxDQUNMLEVBQUUsQ0FDSixDQUFDO1NBQ0g7UUFDRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDL0MsQ0FBQzs7NkdBbkJVLGdCQUFnQiw4Q0FHakIsU0FBUzsyR0FIUixnQkFBZ0I7MkZBQWhCLGdCQUFnQjtrQkFINUIsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsY0FBYztpQkFDckI7OzBCQUlJLE1BQU07MkJBQUMsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0sIExPQ0FMRV9JRCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYWxlbmRhckExMXkgfSBmcm9tICcuL2NhbGVuZGFyLWExMXkucHJvdmlkZXInO1xuaW1wb3J0IHsgQTExeVBhcmFtcyB9IGZyb20gJy4vY2FsZW5kYXItYTExeS5pbnRlcmZhY2UnO1xuXG4vKipcbiAqIFRoaXMgcGlwZSBpcyBwcmltYXJpbHkgZm9yIHJlbmRlcmluZyBhcmlhIGxhYmVscy4gRXhhbXBsZSB1c2FnZTpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIC8vIHdoZXJlIGBteUV2ZW50YCBpcyBhIGBDYWxlbmRhckV2ZW50YCBhbmQgbXlMb2NhbGUgaXMgYSBsb2NhbGUgaWRlbnRpZmllclxuICoge3sgeyBldmVudDogbXlFdmVudCwgbG9jYWxlOiBteUxvY2FsZSB9IHwgY2FsZW5kYXJBMTF5OiAnZXZlbnREZXNjcmlwdGlvbicgfX1cbiAqIGBgYFxuICovXG5AUGlwZSh7XG4gIG5hbWU6ICdjYWxlbmRhckExMXknLFxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckExMXlQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY2FsZW5kYXJBMTF5OiBDYWxlbmRhckExMXksXG4gICAgQEluamVjdChMT0NBTEVfSUQpIHByaXZhdGUgbG9jYWxlOiBzdHJpbmdcbiAgKSB7fVxuXG4gIHRyYW5zZm9ybShhMTF5UGFyYW1zOiBBMTF5UGFyYW1zLCBtZXRob2Q6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgYTExeVBhcmFtcy5sb2NhbGUgPSBhMTF5UGFyYW1zLmxvY2FsZSB8fCB0aGlzLmxvY2FsZTtcbiAgICBpZiAodHlwZW9mIHRoaXMuY2FsZW5kYXJBMTF5W21ldGhvZF0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zdCBhbGxvd2VkTWV0aG9kcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKFxuICAgICAgICBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQ2FsZW5kYXJBMTF5LnByb3RvdHlwZSlcbiAgICAgICkuZmlsdGVyKChpTWV0aG9kKSA9PiBpTWV0aG9kICE9PSAnY29uc3RydWN0b3InKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYCR7bWV0aG9kfSBpcyBub3QgYSB2YWxpZCBhMTF5IG1ldGhvZC4gQ2FuIG9ubHkgYmUgb25lIG9mICR7YWxsb3dlZE1ldGhvZHMuam9pbihcbiAgICAgICAgICAnLCAnXG4gICAgICAgICl9YFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY2FsZW5kYXJBMTF5W21ldGhvZF0oYTExeVBhcmFtcyk7XG4gIH1cbn1cbiJdfQ==