import { fromUnixTime, getUnixTime } from 'date-fns';

export default function convertDate(dateObj, timezone) {
    const utcDate = new Date(
        dateObj.getUTCFullYear(),
        dateObj.getUTCMonth(),
        dateObj.getUTCDate(),
        dateObj.getUTCHours(),
        dateObj.getUTCMinutes(),
        dateObj.getUTCSeconds()
    );

    const unixTime = getUnixTime(utcDate) + timezone;

    return fromUnixTime(unixTime);
}
