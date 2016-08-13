import {Component, EventEmitter, OnInit, Input, Output, ViewChild} from '@angular/core';
import {TimeEvent} from "../model/timeevent.interface";
import {EventType} from "../model/eventtype.enum";
import {EnumUtil} from "../config/enum-util.class";
import {Participant} from "../model/participant.interface";
import * as moment from 'moment';
import {DATEPICKER_DIRECTIVES} from 'ng2-bootstrap';
import {MODAL_DIRECTIVES, BS_VIEW_PROVIDERS, ModalDirective} from 'ng2-bootstrap/ng2-bootstrap';
import {TimeEventService} from "../time-event.service";

@Component({
    moduleId: module.id,
    selector: 'app-modal-event-detail',
    templateUrl: 'event-detail.component.html',
    styleUrls: ['event-detail.component.css'],
    directives: [DATEPICKER_DIRECTIVES, MODAL_DIRECTIVES],
    viewProviders:[BS_VIEW_PROVIDERS],
})
export class EventDetailComponent implements OnInit {

    _dt:Date = new Date();
    minDate:Date = void 0;
    originalTitle: string;
    selectedEvent: TimeEvent;
    eventTypes: Array<string>;
    persons: Array<Participant>;
    newParticipant: Participant;
    @ViewChild('lgModal') lgModal: ModalDirective;
    @Input('event') set _event(value: TimeEvent) {
        if (value) this.originalTitle = value.title;
        // CLONE DEEP
        this.selectedEvent =  Object.assign({}, value);
        this.selectedEvent.participants = value.participants.slice();
    }
    @Output() saved = new EventEmitter();

    constructor(private timeEventService: TimeEventService) {
        (this.minDate = new Date()).setDate(this.minDate.getDate() - 1000);
        this.timeEventService.eventEditted.subscribe((eventId: string) => {
            if (eventId) {
                this.lgModal.show();
            }
        });
    }

    ngOnInit() {
        this.eventTypes = EnumUtil.getNames(EventType);
        this.persons = [{id: 0, firstname:"", lastname:""}, {id: 1, firstname:"Jean-Louis", lastname:"Bourlet"}, {id: 2, firstname:"Maylee", lastname:"Bourlet"}];
        this.newParticipant = this.persons[0];
    }

    set dt (value: Date) {
        this._dt = value;
        let dtMoment = moment(value);
        this.selectedEvent.date = dtMoment.format('YYYY-MM-DD');
    }

    addParticipant() {
        let index = this.selectedEvent.participants.findIndex(part => part.id === this.newParticipant.id);
        if (this.newParticipant.id !== 0 && index === -1) {
            this.selectedEvent.participants.push(this.newParticipant);
        }
    }

    deleteParticipant(participant, $event) {
        let objIndex = this.selectedEvent.participants.indexOf(participant);
        this.selectedEvent.participants.splice(objIndex, 1);
        $event.preventDefault();
    }

    createTimeEvent() {
        if (this.selectedEvent.participants.length > 0) {
            this.saved.emit(this.selectedEvent);
            this.lgModal.hide();
        }
    }

    personDisplayName(participant: Participant) {
        if (participant.id !== 0) {
            return participant.firstname + " " + participant.lastname;
        } else {
            return "[Select a participant]";
        }
    }
}
