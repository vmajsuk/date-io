'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var tslib_1 = require('tslib');
var iMoment = _interopDefault(require('moment-hijri'));
var DefaultMomentUtils = _interopDefault(require('@date-io/moment'));

var symbolMap = {
    1: "١",
    2: "٢",
    3: "٣",
    4: "٤",
    5: "٥",
    6: "٦",
    7: "٧",
    8: "٨",
    9: "٩",
    0: "٠"
};
var MomentUtils = /** @class */ (function (_super) {
    tslib_1.__extends(MomentUtils, _super);
    function MomentUtils(_a) {
        var _b = _a === void 0 ? {} : _a, moment = _b.moment, instance = _b.instance;
        var _this = _super.call(this, { locale: "ar-SA", moment: moment }) || this;
        _this.dateTime12hFormat = "iD iMMMM hh:mm a";
        _this.dateTime24hFormat = "iD iMMMM HH:mm";
        _this.time12hFormat = "hh:mm A";
        _this.time24hFormat = "HH:mm";
        _this.dateFormat = "iD iMMMM";
        _this.moment = instance || moment || iMoment;
        _this.locale = "ar-SA";
        return _this;
    }
    MomentUtils.prototype.toIMoment = function (date) {
        return this.moment(date ? date.clone() : undefined).locale("ar-SA");
    };
    MomentUtils.prototype.parse = function (value, format) {
        if (value === "") {
            return null;
        }
        return this.moment(value, format, true).locale("ar-SA");
    };
    MomentUtils.prototype.date = function (value) {
        if (value === null) {
            return null;
        }
        return this.moment(value).locale("ar-SA");
    };
    MomentUtils.prototype.isBeforeYear = function (date, value) {
        return date.iYear() < value.iYear();
    };
    MomentUtils.prototype.isAfterYear = function (date, value) {
        return date.iYear() > value.iYear();
    };
    MomentUtils.prototype.getMonth = function (date) {
        return date.iMonth();
    };
    MomentUtils.prototype.startOfMonth = function (date) {
        return date.clone().startOf("iMonth");
    };
    MomentUtils.prototype.endOfMonth = function (date) {
        return date.clone().endOf("iMonth");
    };
    MomentUtils.prototype.getNextMonth = function (date) {
        return date.clone().add(1, "iMonth");
    };
    MomentUtils.prototype.getPreviousMonth = function (date) {
        return date.clone().subtract(1, "iMonth");
    };
    MomentUtils.prototype.getYear = function (date) {
        return date.iYear();
    };
    MomentUtils.prototype.setYear = function (date, year) {
        return date.clone().iYear(year);
    };
    MomentUtils.prototype.getMeridiemText = function (ampm) {
        return ampm === "am"
            ? this.toIMoment()
                .hours(2)
                .format("A")
            : this.toIMoment()
                .hours(14)
                .format("A");
    };
    MomentUtils.prototype.getWeekdays = function () {
        var _this = this;
        return [0, 1, 2, 3, 4, 5, 6].map(function (dayOfWeek) {
            return _this.toIMoment()
                .weekday(dayOfWeek)
                .format("dd");
        });
    };
    MomentUtils.prototype.isEqual = function (value, comparing) {
        if (value === null && comparing === null) {
            return true;
        }
        return this.moment(value).isSame(comparing);
    };
    MomentUtils.prototype.formatNumber = function (num) {
        return num.replace(/\d/g, function (match) { return symbolMap[match]; }).replace(/,/g, "،");
    };
    MomentUtils.prototype.getWeekArray = function (date) {
        var start = date
            .clone()
            .startOf("iMonth")
            .startOf("week");
        var end = date
            .clone()
            .endOf("iMonth")
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
    MomentUtils.prototype.getYearRange = function (start, end) {
        // moment-hijri only supports dates between 1356-01-01 H and 1499-12-29 H
        // We need to throw if outside min/max bounds, otherwise the while loop below will be infinite.
        if (start.isBefore("1937-03-14")) {
            throw new Error("min date must be on or after 1356-01-01 H (1937-03-14)");
        }
        if (end.isAfter("2076-11-26")) {
            throw new Error("max date must be on or before 1499-12-29 H (2076-11-26)");
        }
        var startDate = this.moment(start).startOf("iYear");
        var endDate = this.moment(end).endOf("iYear");
        var years = [];
        var current = startDate;
        while (current.isBefore(endDate)) {
            years.push(current);
            current = current.clone().add(1, "iYear");
        }
        return years;
    };
    // displaying methods
    MomentUtils.prototype.getCalendarHeaderText = function (date) {
        return date.format("iMMMM iYYYY");
    };
    MomentUtils.prototype.getYearText = function (date) {
        return date.format("iYYYY");
    };
    MomentUtils.prototype.getDatePickerHeaderText = function (date) {
        return date.format("dddd, iD iMMM");
    };
    MomentUtils.prototype.getDateTimePickerHeaderText = function (date) {
        return date.format("iD iMMM");
    };
    MomentUtils.prototype.getDayText = function (date) {
        return date.format("iD");
    };
    return MomentUtils;
}(DefaultMomentUtils));

module.exports = MomentUtils;
