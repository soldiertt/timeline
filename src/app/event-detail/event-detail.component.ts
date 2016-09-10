import {Component, EventEmitter, OnInit, Input, Output, ViewChild, ElementRef} from '@angular/core';
import {TimeEvent} from "../model/timeevent.interface";
import {EventType} from "../model/eventtype.enum";
import {EnumUtil} from "../config/enum-util.class";
import {Participant} from "../model/participant.interface";
import * as moment from 'moment';
import {TimeEventService} from "../time-event.service";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-modal-event-detail',
    templateUrl: 'event-detail.component.html',
    styleUrls: ['event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

    _dt: any = {};
    minDate: Date = void 0;
    originalTitle: string;
    selectedEvent: TimeEvent;
    eventTypes: Array<string>;
    persons: Array<Participant>;
    newParticipant: Participant;
    closeResult: string;
    @ViewChild('eventModal') eventModal: ElementRef;

    @Input('event') set _event(value: TimeEvent) {
        if (value) this.originalTitle = value.title;
        // CLONE DEEP
        this.selectedEvent = Object.assign({}, value);
        let dtMoment = moment(this.selectedEvent.date);
        this.selectedEvent.date = dtMoment.format('YYYY-MM-DD');
        this.selectedEvent.participants = value.participants.slice();
    }

    @Output() saved = new EventEmitter();
    @Output() new = new EventEmitter();

    constructor(private timeEventService: TimeEventService, private modalService: NgbModal) {
        (this.minDate = new Date()).setDate(this.minDate.getDate() - 1000);
        this.timeEventService.eventEditted.subscribe((eventId: string) => {
            if (eventId) {
               this.openEventModel(this.eventModal);
            }
        });
    }

    ngOnInit() {
        this.eventTypes = EnumUtil.getNames(EventType);
        this.persons = [{id: 0, firstname: "", lastname: ""},
            {id: 1, firstname: "Jean-Louis", lastname: "Bourlet"},
            {id: 2, firstname: "Maylee", lastname: "Bourlet"},
            {id: 3, firstname: "Liam", lastname: "Bourlet"},
            {id: 4, firstname: "Yun", lastname: "Li"}];
        this.newParticipant = this.persons[0];
    }

    set dt(value: any) {
        this._dt = value;
        let dtMoment = moment(new Date(value.year, value.month, value.day));
        this.selectedEvent.date = dtMoment.format('YYYY-MM-DD');
    }

    openEventModel(content) {
        this.modalService.open(content).result.then((result) => {
            if (this.selectedEvent.participants.length > 0) {
                this.saved.emit(this.selectedEvent);
            }
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }


    newTimeEvent() {
        this.new.emit(null);
        this.openEventModel(this.eventModal);
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

    personDisplayName(participant: Participant) {
        if (participant.id !== 0) {
            return participant.firstname + " " + participant.lastname;
        } else {
            return "[Select a participant]";
        }
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }
}
