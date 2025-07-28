import { ModuleWithProviders, Provider } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./calendar-event-actions/calendar-event-actions.component";
import * as i2 from "./calendar-event-title/calendar-event-title.component";
import * as i3 from "./calendar-tooltip/calendar-tooltip.directive";
import * as i4 from "./calendar-previous-view/calendar-previous-view.directive";
import * as i5 from "./calendar-next-view/calendar-next-view.directive";
import * as i6 from "./calendar-today/calendar-today.directive";
import * as i7 from "./calendar-date/calendar-date.pipe";
import * as i8 from "./calendar-event-title/calendar-event-title.pipe";
import * as i9 from "./calendar-a11y/calendar-a11y.pipe";
import * as i10 from "./click/click.directive";
import * as i11 from "./keydown-enter/keydown-enter.directive";
import * as i12 from "@angular/common";
export interface CalendarModuleConfig {
    eventTitleFormatter?: Provider;
    dateFormatter?: Provider;
    utils?: Provider;
    a11y?: Provider;
}
export * from './calendar-event-title-formatter/calendar-event-title-formatter.provider';
export * from './calendar-moment-date-formatter/calendar-moment-date-formatter.provider';
export * from './calendar-native-date-formatter/calendar-native-date-formatter.provider';
export * from './calendar-angular-date-formatter/calendar-angular-date-formatter.provider';
export * from './calendar-date-formatter/calendar-date-formatter.provider';
export * from './calendar-utils/calendar-utils.provider';
export * from './calendar-a11y/calendar-a11y.provider';
export * from './calendar-a11y/calendar-a11y.interface';
export * from './calendar-date-formatter/calendar-date-formatter.interface';
export * from './calendar-event-times-changed-event/calendar-event-times-changed-event.interface';
export * from '../../date-adapters/date-adapter';
export * from './calendar-view/calendar-view.enum';
export { CalendarEventActionsComponent as ɵCalendarEventActionsComponent } from './calendar-event-actions/calendar-event-actions.component';
export { CalendarEventTitleComponent as ɵCalendarEventTitleComponent } from './calendar-event-title/calendar-event-title.component';
export { CalendarTooltipDirective as ɵCalendarTooltipDirective, CalendarTooltipWindowComponent as ɵCalendarTooltipWindowComponent, } from './calendar-tooltip/calendar-tooltip.directive';
export { CalendarPreviousViewDirective as ɵCalendarPreviousViewDirective } from './calendar-previous-view/calendar-previous-view.directive';
export { CalendarNextViewDirective as ɵCalendarNextViewDirective } from './calendar-next-view/calendar-next-view.directive';
export { CalendarTodayDirective as ɵCalendarTodayDirective } from './calendar-today/calendar-today.directive';
export { CalendarDatePipe as ɵCalendarDatePipe } from './calendar-date/calendar-date.pipe';
export { CalendarEventTitlePipe as ɵCalendarEventTitlePipe } from './calendar-event-title/calendar-event-title.pipe';
export { ClickDirective as ɵClickDirective } from './click/click.directive';
export { KeydownEnterDirective as ɵKeydownEnterDirective } from './keydown-enter/keydown-enter.directive';
export { CalendarA11yPipe as ɵCalendarA11yPipe } from './calendar-a11y/calendar-a11y.pipe';
export { CalendarEvent, EventAction as CalendarEventAction, DAYS_OF_WEEK, ViewPeriod as CalendarViewPeriod, } from 'calendar-utils';
/**
 * Import this module to if you're just using a singular view and want to save on bundle size. Example usage:
 *
 * ```typescript
 * import { CalendarCommonModule, CalendarMonthModule } from 'angular-calendar';
 *
 * @NgModule({
 *   imports: [
 *     CalendarCommonModule.forRoot(),
 *     CalendarMonthModule
 *   ]
 * })
 * class MyModule {}
 * ```
 *
 */
export declare class CalendarCommonModule {
    static forRoot(dateAdapter: Provider, config?: CalendarModuleConfig): ModuleWithProviders<CalendarCommonModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CalendarCommonModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<CalendarCommonModule, [typeof i1.CalendarEventActionsComponent, typeof i2.CalendarEventTitleComponent, typeof i3.CalendarTooltipWindowComponent, typeof i3.CalendarTooltipDirective, typeof i4.CalendarPreviousViewDirective, typeof i5.CalendarNextViewDirective, typeof i6.CalendarTodayDirective, typeof i7.CalendarDatePipe, typeof i8.CalendarEventTitlePipe, typeof i9.CalendarA11yPipe, typeof i10.ClickDirective, typeof i11.KeydownEnterDirective], [typeof i12.CommonModule], [typeof i1.CalendarEventActionsComponent, typeof i2.CalendarEventTitleComponent, typeof i3.CalendarTooltipWindowComponent, typeof i3.CalendarTooltipDirective, typeof i4.CalendarPreviousViewDirective, typeof i5.CalendarNextViewDirective, typeof i6.CalendarTodayDirective, typeof i7.CalendarDatePipe, typeof i8.CalendarEventTitlePipe, typeof i9.CalendarA11yPipe, typeof i10.ClickDirective, typeof i11.KeydownEnterDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<CalendarCommonModule>;
}
