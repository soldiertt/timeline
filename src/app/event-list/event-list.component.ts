import {Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import {TimeEvent} from "../model/timeevent.interface";
import {TimeEventService} from "../time-event.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
    selector: 'app-event-list',
    templateUrl: 'event-list.component.html',
    styleUrls: ['event-list.component.css']
})
export class EventListComponent implements OnInit {

    @Input() eventsObs: Observable<Array<TimeEvent>>;
    @Output() selected = new EventEmitter();
    @Output() deleted = new EventEmitter();
    private eventsFilterForm : FormGroup;
    private events: TimeEvent[];
    private filteredEvents: TimeEvent[];
    private allYears: number[] = [];

    constructor(private timeEventService: TimeEventService, private formBuilder: FormBuilder) {
        let year = (new Date()).getFullYear();
        let minYear = year - 80;
        for (let pushYear = year; pushYear > minYear; pushYear--) {
            this.allYears.push(pushYear);
        }
    }

    ngOnInit() {
        this.eventsFilterForm = this.formBuilder.group({
            titleFilter : this.formBuilder.control(""),
            descFilter : this.formBuilder.control(""),
            typeFilter : this.formBuilder.control("ALL"),
            yearFilter : this.formBuilder.control("ALL"),
            participantFilter : this.formBuilder.control("ALL")
        });

        this.eventsObs.subscribe(eventsList => {
            this.events = eventsList;
            this.filterEvents();
        });

        this.eventsFilterForm.valueChanges.subscribe(control => {
                this.filterEvents();
            }
        );
    }

    editEvent(timeEvent: TimeEvent) {
        this.selected.emit(timeEvent);
        this.timeEventService.editTimeEvent(timeEvent);
    }

    filterEvents() {
        this.filteredEvents = this.events.filter(timeEvent =>
                (!this.eventsFilterForm.controls['titleFilter'].value ||
                (timeEvent.title.toLowerCase().indexOf(this.eventsFilterForm.controls['titleFilter'].value.toLowerCase()) != -1))
            && (!this.eventsFilterForm.controls['descFilter'].value ||
                (timeEvent.description && timeEvent.description.toLowerCase().indexOf(this.eventsFilterForm.controls['descFilter'].value.toLowerCase()) != -1))
            && (this.eventsFilterForm.controls['typeFilter'].value === "ALL" ||
                (timeEvent.type === this.eventsFilterForm.controls['typeFilter'].value))
            && (this.eventsFilterForm.controls['yearFilter'].value === "ALL" ||
                (timeEvent.date.substr(0,4) === this.eventsFilterForm.controls['yearFilter'].value))
            && (this.eventsFilterForm.controls['participantFilter'].value === "ALL" ||
                (timeEvent.participants.some(participant => (participant.firstname + " " + participant.lastname) == this.eventsFilterForm.controls['participantFilter'].value)))
        );
    }
}
