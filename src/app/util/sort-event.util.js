"use strict";
/**
 * Created by soldi on 10-08-16.
 */
function TimeEventSorter(a, b) {
    var aDate = new Date(a.date);
    var bDate = new Date(b.date);
    if (aDate > bDate) {
        return -1;
    }
    else if (aDate < bDate) {
        return 1;
    }
    else {
        return 0;
    }
}
exports.TimeEventSorter = TimeEventSorter;
//# sourceMappingURL=sort-event.util.js.map