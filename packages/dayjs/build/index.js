'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var defaultDayjs = _interopDefault(require('dayjs'));
var customParseFormat = _interopDefault(require('dayjs/plugin/customParseFormat'));
var advancedFormat = _interopDefault(require('dayjs/plugin/advancedFormat'));

defaultDayjs.extend(customParseFormat);
defaultDayjs.extend(advancedFormat);
var DayjsUtils = /** @class */ (function () {
    function DayjsUtils(_a) {
        var _b = _a === void 0 ? {} : _a, locale = _b.locale, instance = _b.instance, dayjs = _b.dayjs;
        this.yearFormat = "YYYY";
        this.yearMonthFormat = "MMMM YYYY";
        this.dateTime12hFormat = "MMMM Do hh:mm a";
        this.dateTime24hFormat = "MMMM Do HH:mm";
        this.time12hFormat = "hh:mm A";
        this.time24hFormat = "HH:mm";
        this.dateFormat = "MMMM Do";
        this.dayjs = instance || dayjs || defaultDayjs;
        this.locale = locale;
    }
    DayjsUtils.prototype.parse = function (value, format) {
        if (value === "") {
            return null;
        }
        return this.dayjs(value, format);
    };
    DayjsUtils.prototype.date = function (value) {
        if (value === null) {
            return null;
        }
        return this.dayjs(value);
    };
    DayjsUtils.prototype.isValid = function (value) {
        return this.dayjs(value).isValid();
    };
    DayjsUtils.prototype.isNull = function (date) {
        if (date === null) {
            return true;
        }
        return false;
    };
    DayjsUtils.prototype.getDiff = function (date, comparing, units, float) {
        return date.diff(comparing, units, float);
    };
    DayjsUtils.prototype.isAfter = function (date, value) {
        return date.isAfter(value);
    };
    DayjsUtils.prototype.isBefore = function (date, value) {
        return date.isBefore(value);
    };
    DayjsUtils.prototype.isAfterDay = function (date, value) {
        return date.isAfter(value, "day");
    };
    DayjsUtils.prototype.isBeforeDay = function (date, value) {
        return date.isBefore(value, "day");
    };
    DayjsUtils.prototype.isBeforeYear = function (date, value) {
        return date.isBefore(value, "year");
    };
    DayjsUtils.prototype.isAfterYear = function (date, value) {
        return date.isAfter(value, "year");
    };
    DayjsUtils.prototype.startOfDay = function (date) {
        return date.clone().startOf("day");
    };
    DayjsUtils.prototype.endOfDay = function (date) {
        return date.clone().endOf("day");
    };
    DayjsUtils.prototype.format = function (date, formatString) {
        date.locale(this.locale);
        return date.format(formatString);
    };
    DayjsUtils.prototype.formatNumber = function (numberToFormat) {
        return numberToFormat;
    };
    DayjsUtils.prototype.getHours = function (date) {
        return date.hour();
    };
    DayjsUtils.prototype.addDays = function (date, count) {
        return count < 0
            ? date.clone().subtract(Math.abs(count), "day")
            : date.clone().add(count, "day");
    };
    DayjsUtils.prototype.setMonth = function (date, count) {
        return date.clone().set("month", count);
    };
    DayjsUtils.prototype.setHours = function (date, count) {
        return date.clone().set("hour", count);
    };
    DayjsUtils.prototype.getMinutes = function (date) {
        return date.minute();
    };
    DayjsUtils.prototype.setMinutes = function (date, count) {
        return date.clone().set("minute", count);
    };
    DayjsUtils.prototype.getSeconds = function (date) {
        return date.second();
    };
    DayjsUtils.prototype.setSeconds = function (date, count) {
        return date.clone().set("second", count);
    };
    DayjsUtils.prototype.getMonth = function (date) {
        return date.month();
    };
    DayjsUtils.prototype.isSameDay = function (date, comparing) {
        return date.isSame(comparing, "day");
    };
    DayjsUtils.prototype.getMeridiemText = function (ampm) {
        return ampm === "am" ? "AM" : "PM";
    };
    DayjsUtils.prototype.startOfMonth = function (date) {
        return date.clone().startOf("month");
    };
    DayjsUtils.prototype.endOfMonth = function (date) {
        return date.clone().endOf("month");
    };
    DayjsUtils.prototype.getNextMonth = function (date) {
        return date.clone().add(1, "month");
    };
    DayjsUtils.prototype.getPreviousMonth = function (date) {
        return date.clone().subtract(1, "month");
    };
    DayjsUtils.prototype.getMonthArray = function (date) {
        var firstMonth = date.clone().startOf("year");
        var monthArray = [firstMonth];
        while (monthArray.length < 12) {
            var prevMonth = monthArray[monthArray.length - 1];
            monthArray.push(this.getNextMonth(prevMonth));
        }
        return monthArray;
    };
    DayjsUtils.prototype.getMonthText = function (date) {
        return this.format(date, "MMMM");
    };
    DayjsUtils.prototype.getYear = function (date) {
        return date.year();
    };
    DayjsUtils.prototype.setYear = function (date, year) {
        return date.clone().set("year", year);
    };
    DayjsUtils.prototype.mergeDateAndTime = function (date, time) {
        return this.setMinutes(this.setHours(date, this.getHours(time)), this.getMinutes(time));
    };
    DayjsUtils.prototype.getWeekdays = function () {
        var _this = this;
        var start = this.dayjs().startOf("week");
        return [0, 1, 2, 3, 4, 5, 6].map(function (diff) {
            return _this.format(_this.dayjs(start).add(diff, "day"), "dd");
        });
    };
    DayjsUtils.prototype.isEqual = function (value, comparing) {
        if (value === null && comparing === null) {
            return true;
        }
        return this.dayjs(value).isSame(comparing);
    };
    DayjsUtils.prototype.getWeekArray = function (date) {
        var start = date
            .clone()
            .startOf("month")
            .startOf("week");
        var end = date
            .clone()
            .endOf("month")
            .endOf("week");
        var count = 0;
        var current = start;
        var nestedWeeks = [];
        while (current.isBefore(end)) {
            var weekNumber = Math.floor(count / 7);
            nestedWeeks[weekNumber] = nestedWeeks[weekNumber] || [];
            nestedWeeks[weekNumber].push(current);
            current = current.clone().add(1, "day");
            count += 1;
        }
        return nestedWeeks;
    };
    DayjsUtils.prototype.getYearRange = function (start, end) {
        var startDate = this.dayjs(start).startOf("year");
        var endDate = this.dayjs(end).endOf("year");
        var years = [];
        var current = startDate;
        while (current.isBefore(endDate)) {
            years.push(current);
            current = current.clone().add(1, "year");
        }
        return years;
    };
    // displaying methods
    DayjsUtils.prototype.getCalendarHeaderText = function (date) {
        return this.format(date, "MMMM YYYY");
    };
    DayjsUtils.prototype.getYearText = function (date) {
        return this.format(date, "YYYY");
    };
    DayjsUtils.prototype.getDatePickerHeaderText = function (date) {
        return this.format(date, "ddd, MMM D");
    };
    DayjsUtils.prototype.getDateTimePickerHeaderText = function (date) {
        return this.format(date, "MMM D");
    };
    DayjsUtils.prototype.getDayText = function (date) {
        return this.format(date, "D");
    };
    DayjsUtils.prototype.getHourText = function (date, ampm) {
        return this.format(date, ampm ? "hh" : "HH");
    };
    DayjsUtils.prototype.getMinuteText = function (date) {
        return this.format(date, "mm");
    };
    DayjsUtils.prototype.getSecondText = function (date) {
        return this.format(date, "ss");
    };
    return DayjsUtils;
}());

module.exports = DayjsUtils;
