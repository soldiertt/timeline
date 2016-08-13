/**
 * Created by soldi on 31-07-16.
 */
import {Injectable, EventEmitter} from "@angular/core";
import {TimeEvent} from "./model/timeevent.interface";


@Injectable()
export class TimeEventService {
    eventEditted: EventEmitter<string> = new EventEmitter<string>();

    constructor() {

    }

    editTimeEvent(timeEvent: TimeEvent) {
        this.eventEditted.emit(timeEvent.id);
    }

}
