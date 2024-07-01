let moment = require('moment-timezone');

export class UtilsDate {
  static formatDateTimeVNToString(date: Date): string {
    console.log(date);
    
    if (!date) {
      return "";
    }
    return moment(date).format("DD/MM/YYYY HH:mm");
  }

  static formatDateTimeVNToStringNoTime(date: Date): string {
    if (!date) {
      return "";
    }
    return moment(date).format("DD/MM/YYYY");
  }

  static formatDateVNToString(date: Date): string {
    if (!date) {
      return "";
    }
    return moment(date).format("DD/MM/YYYY");
  }

  static formatDateInsertDatabase(date: string): string {
    if (date == null || date == "") {
      return "";
    } else {
      return moment(date, "DD/MM/YYYY").format("YYYY-MM-DD");
    }
  }

  static formatDateTimeInsertDatabase(date: string): string {
    if (date == null || date == "") {
      return "";
    } else {
      return moment(date, "DD/MM/YYYY HH:mm").format("YYYY-MM-DD HH:mm");
    }
  }

  static formatStringDateToDate(date: string): Date {
    return new Date(this.formatDateInsertDatabase(date));
  }

  static formatDateTimeVNToStringKafka(date: Date): string {
    if (!date) {
      return "";
    }
    return moment(date).format("YYYY-MM-DD HH:mm:ss");
  }

  static formatStringDateTimeToDateTime(date: string): Date {
    return new Date(this.formatDateTimeInsertDatabase(date));
  }

  static formatDateTimeWithSecondInsertDatabase(date: string): string {
    if (date == null || date == "") {
      return "";
    } else {
      return moment(date, "DD/MM/YYYY HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");
    }
  }

  static formatDateTimeVNToStringWithSecond(date: Date): string {
    if (!date) {
      return "";
    }
    return moment(date).format("DD/MM/YYYY HH:mm:ss");
  }
}
