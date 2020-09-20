/* eslint-disable no-undef */
import { dayMonthYear, yearMonthDay } from './formatDate';

const dateToFormat = '1997-02-18';

describe('formatDate', () => {
  it('dayMonthYear should return a date formated to DD-MM-YYYY', () => {
    expect(dayMonthYear(dateToFormat)).toBe('18-02-1997');
  });

  it('yearMonthDay should return a date formated to YYYY-MM-DD', () => {
    expect(yearMonthDay(dateToFormat)).toBe('1997-02-18');
  });
});
