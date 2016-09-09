import {Component, OnInit } from '@angular/core';
import {TimeEvent} from "./model/timeevent.interface";
import {Observable} from "rxjs/Rx";
import {EventListService} from "./event-list/event-list.service";

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
    events:Observable<Array<TimeEvent>>;
    selectedEvent: TimeEvent;

    constructor(private eventListService: EventListService) {
    }

    ngOnInit() {
        this.events = this.eventListService.events;
        this.resetEvent();
    }

    resetEvent() {
        this.selectedEvent = <TimeEvent>{ participants: [] };
    }

    selectEvent(event: TimeEvent) {
        this.selectedEvent = event;
    }

    saveEvent(event: TimeEvent) {
        this.eventListService.saveEvent(event);
        this.resetEvent();
    }

    deleteEvent(event: TimeEvent) {
        this.eventListService.deleteEvent(event);
        this.resetEvent();
    }

}
