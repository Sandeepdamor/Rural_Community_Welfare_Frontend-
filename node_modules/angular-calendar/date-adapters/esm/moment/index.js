import { __assign } from "tslib";
import { adapterFactory as baseAdapterFactory } from 'calendar-utils/date-adapters/moment';
export function adapterFactory(moment) {
    return __assign(__assign({}, baseAdapterFactory(moment)), { addWeeks: function (date, amount) {
            return moment(date).add(amount, 'weeks').toDate();
        }, addMonths: function (date, amount) {
            return moment(date).add(amount, 'months').toDate();
        }, subDays: function (date, amount) {
            return moment(date).subtract(amount, 'days').toDate();
        }, subWeeks: function (date, amount) {
            return moment(date).subtract(amount, 'weeks').toDate();
        }, subMonths: function (date, amount) {
            return moment(date).subtract(amount, 'months').toDate();
        }, getISOWeek: function (date) {
            return moment(date).isoWeek();
        }, setDate: function (date, dayOfMonth) {
            return moment(date).date(dayOfMonth).toDate();
        }, setMonth: function (date, month) {
            return moment(date).month(month).toDate();
        }, setYear: function (date, year) {
            return moment(date).year(year).toDate();
        }, getDate: function (date) {
            return moment(date).date();
        }, getYear: function (date) {
            return moment(date).year();
        } });
}
//# sourceMappingURL=index.js.map