import * as moment from "moment";
import CONFIG from "./../config/config";

export class DateHelper {
    static toLongDateString(date: Date) {
        return this.format(date, CONFIG.DATE.LONG_FORMAT);
    }

    static toShortDateString(date: Date) {
        return this.format(date, CONFIG.DATE.SHORT_FORMAT);
    }

    private static format(date: Date, formatString: string) {
        return date == null ? "" : moment(date).format(formatString);
    }
}
