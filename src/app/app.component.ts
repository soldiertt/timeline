import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {TimeEvent} from "./model/timeevent.interface";
import {Observable} from "rxjs/Rx";
import {EventListService} from "./event-list/event-list.service";
import {EventListComponent} from "./event-list/event-list.component";
import {EventDetailComponent} from "./event-detail/event-detail.component";


@Component({
    moduleId: module.id,
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    directives: [EventListComponent, EventDetailComponent]
})
export class AppComponent implements OnInit {
    events:Observable<Array<TimeEvent>>;
    selectedEvent: TimeEvent;
    viewContainerRef: ViewContainerRef;


    constructor(private eventListService: EventListService, viewContainerRef: ViewContainerRef) {
        this.viewContainerRef = viewContainerRef;
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
