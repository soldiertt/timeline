import {TimeEvent} from "../model/timeevent.interface";
/**
 * Created by soldi on 10-08-16.
 */

export function TimeEventSorter (a: TimeEvent, b: TimeEvent) {
    let aDate: Date = new Date(a.date);
    let bDate: Date = new Date(b.date);
    if (aDate > bDate) {
        return -1;
    } else if (aDate < bDate) {
        return 1;
    } else {
        return 0;
    }
}
