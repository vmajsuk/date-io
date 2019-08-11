import { __extends } from 'tslib';
import jMoment from 'moment-jalaali';
import DefaultMomentUtils from '@date-io/moment';

var symbolMap = {
    1: "۱",
    2: "۲",
    3: "۳",
    4: "۴",
    5: "۵",
    6: "۶",
    7: "۷",
    8: "۸",
    9: "۹",
    0: "۰"
};
var MomentUtils = /** @class */ (function (_super) {
    __extends(MomentUtils, _super);
    function MomentUtils(_a) {
        var _b = _a === void 0 ? {} : _a, moment = _b.moment, instance = _b.instance;
        var _this = _super.call(this, { locale: "fa", moment: moment }) || this;
        _this.dateTime12hFormat = "jMMMM jD hh:mm a";
        _this.dateTime24hFormat = "jMMMM jD HH:mm";
        _this.time12hFormat = "hh:mm A";
        _this.time24hFormat = "HH:mm";
        _this.dateFormat = "jMMMM jD";
        _this.moment = instance || moment || jMoment;
        _this.locale = "fa";
        return _this;
    }
    MomentUtils.prototype.toJMoment = function (date) {
        return this.moment(date ? date.clone() : undefined).locale("fa");
    };
    MomentUtils.prototype.parse = function (value, format) {
        if (value === "") {
            return null;
        }
        return this.moment(value, format, true).locale("fa");
    };
    MomentUtils.prototype.date = function (value) {
        if (value === null) {
            return null;
        }
        return this.moment(value).locale("fa");
    };
    MomentUtils.prototype.isBeforeYear = function (date, value) {
        return date.jYear() < value.jYear();
    };
    MomentUtils.prototype.isAfterYear = function (date, value) {
        return date.jYear() > value.jYear();
    };
    MomentUtils.prototype.getMonth = function (date) {
        return date.jMonth();
    };
    MomentUtils.prototype.startOfMonth = function (date) {
        return date.clone().startOf("jMonth");
    };
    MomentUtils.prototype.endOfMonth = function (date) {
        return date.clone().endOf("jMonth");
    };
    MomentUtils.prototype.getNextMonth = function (date) {
        return date.clone().add(1, "jMonth");
    };
    MomentUtils.prototype.getPreviousMonth = function (date) {
        return date.clone().subtract(1, "jMonth");
    };
    MomentUtils.prototype.getYear = function (date) {
        return date.jYear();
    };
    MomentUtils.prototype.setYear = function (date, year) {
        return date.clone().jYear(year);
    };
    MomentUtils.prototype.getMeridiemText = function (ampm) {
        return ampm === "am"
            ? this.toJMoment()
                .hours(2)
                .format("A")
            : this.toJMoment()
                .hours(14)
                .format("A");
    };
    MomentUtils.prototype.getWeekdays = function () {
        var _this = this;
        return [0, 1, 2, 3, 4, 5, 6].map(function (dayOfWeek) {
            return _this.toJMoment()
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
            .startOf("jMonth")
            .startOf("week");
        var end = date
            .clone()
            .endOf("jMonth")
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
        var startDate = this.moment(start).startOf("jYear");
        var endDate = this.moment(end).endOf("jYear");
        var years = [];
        var current = startDate;
        while (current.isBefore(endDate)) {
            years.push(current);
            current = current.clone().add(1, "jYear");
        }
        return years;
    };
    // displaying methods
    MomentUtils.prototype.getCalendarHeaderText = function (date) {
        return date.format("jMMMM jYYYY");
    };
    MomentUtils.prototype.getYearText = function (date) {
        return date.format("jYYYY");
    };
    MomentUtils.prototype.getDatePickerHeaderText = function (date) {
        return date.format("ddd, jMMM jD");
    };
    MomentUtils.prototype.getDateTimePickerHeaderText = function (date) {
        return date.format("jMMM jD");
    };
    MomentUtils.prototype.getDayText = function (date) {
        return date.format("jD");
    };
    return MomentUtils;
}(DefaultMomentUtils));

export default MomentUtils;
