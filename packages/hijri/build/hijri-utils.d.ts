import Moment from "moment";
import iMoment from "moment-hijri";
import DefaultMomentUtils from "@date-io/moment";
interface Opts {
  /** @deprecated */
  moment?: typeof iMoment;
  instance?: typeof iMoment;
}
declare type Moment = iMoment.Moment;
export default class MomentUtils extends DefaultMomentUtils {
  moment: typeof iMoment;
  locale?: string;
  dateTime12hFormat: string;
  dateTime24hFormat: string;
  time12hFormat: string;
  time24hFormat: string;
  dateFormat: string;
  constructor({ moment, instance }?: Opts);
  private toIMoment;
  parse(value: string, format: string): any;
  date(value?: any): any;
  isBeforeYear(date: Moment, value: Moment): boolean;
  isAfterYear(date: Moment, value: Moment): boolean;
  getMonth(date: Moment): any;
  startOfMonth(date: Moment): any;
  endOfMonth(date: Moment): any;
  getNextMonth(date: Moment): any;
  getPreviousMonth(date: Moment): any;
  getYear(date: Moment): any;
  setYear(date: Moment, year: number): any;
  getMeridiemText(ampm: "am" | "pm"): any;
  getWeekdays(): any[];
  isEqual(value: any, comparing: any): any;
  formatNumber(num: string): string;
  getWeekArray(date: Moment): any[][];
  getYearRange(start: Moment, end: Moment): any[];
  getCalendarHeaderText(date: Moment): any;
  getYearText(date: Moment): any;
  getDatePickerHeaderText(date: Moment): any;
  getDateTimePickerHeaderText(date: Moment): any;
  getDayText(date: Moment): any;
}
export {};
