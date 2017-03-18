export default class DateEx {
  static getMonthName(date) {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];

    return months[date.getMonth()];
  }

  static getDayOfWeekName(date) {
    const daysOfWeeks = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    return daysOfWeeks[date.getDay()];
  }

  constructor(date = new Date()) {
    this.date = date;
  }

  getDay() {
    return DateEx.getDayOfWeekName(this.date);
  }

  getDate() {
    return `${DateEx.getMonthName(this.date)} ${this.date.getDate()}`;
  }

  getTime() {
    const hours = this.date.getHours();
    const mins = this.date.getMinutes();

    const hours12 = hours % 12;
    return `${hours12 === 0 ? 12 : hours12}:${mins < 10 ? '0' : ''}${mins}${hours >= 12 ? 'pm' : 'am'}`;
  }

  getAll() {
    return `${this.getDay()}, ${this.getDate()}, ${this.getTime()}`;
  }

}
