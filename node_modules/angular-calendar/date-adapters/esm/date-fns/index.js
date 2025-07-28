import { __assign } from "tslib";
import { adapterFactory as baseAdapterFactory } from 'calendar-utils/date-adapters/date-fns';
import { addWeeks, addMonths, subDays, subWeeks, subMonths, getISOWeek, setDate, setMonth, setYear, getDate, getYear, } from 'date-fns';
export function adapterFactory() {
    return __assign(__assign({}, baseAdapterFactory()), { addWeeks: addWeeks, addMonths: addMonths, subDays: subDays, subWeeks: subWeeks, subMonths: subMonths, getISOWeek: getISOWeek, setDate: setDate, setMonth: setMonth, setYear: setYear, getDate: getDate, getYear: getYear });
}
//# sourceMappingURL=index.js.map