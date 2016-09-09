import {Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import {TimeEvent} from "../model/timeevent.interface";
import {TimeEventService} from "../time-event.service";

@Component({
    selector: 'app-event-list',
    templateUrl: 'event-list.component.html',
    styleUrls: ['event-list.component.css']
})
export class EventListComponent implements OnInit {

    @Input() events: Array<TimeEvent>;
    @Output() selected = new EventEmitter();
    @Output() deleted = new EventEmitter();

    constructor(private timeEventService: TimeEventService) {
    }

    ngOnInit() {
    }

    editEvent(timeEvent: TimeEvent) {
        this.selected.emit(timeEvent);
        this.timeEventService.editTimeEvent(timeEvent);
    }
}
