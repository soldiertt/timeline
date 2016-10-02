/**
 * Created by soldi on 31-07-16.
 */
import {Injectable, Inject} from "@angular/core";
import {Observable, BehaviorSubject} from "rxjs/Rx";
import {TimeEvent} from "../model/timeevent.interface";
import {Http} from "@angular/http";
import {TimeEventSorter} from "../util/sort-event.util";

@Injectable()
export class EventListService {
    private _eventsSubject: BehaviorSubject<Array<TimeEvent>> = new BehaviorSubject([]);
    public events: Observable<Array<TimeEvent>> = this._eventsSubject.asObservable();

    constructor(@Inject('webApiBaseUrl') private baseUrl, private http: Http) {
        this.loadEvents();
    }

    loadEvents() {
        let obs = this.http.get(this.baseUrl + "/timeevent").cache();

        obs.map(res => res.json())
            .map(this.convertDates)
            .subscribe(events => {
                this._eventsSubject.next(this.orderByDate(events));
            });

        return obs;
    }

    saveEvent(saveEvent: TimeEvent) {
        (saveEvent.id) ? this.updateEvent(saveEvent) : this.createEvent(saveEvent);
    }

    createEvent(newEvent: TimeEvent) {
        let obs = this.http.post(`${this.baseUrl}/timeevent`, JSON.stringify(newEvent)).cache();

        obs.map(res => res.json())
            .subscribe(event => {
                const actualEvents =  this._eventsSubject.getValue();
                actualEvents.push(event);
                this._eventsSubject.next(this.orderByDate(actualEvents));
            });

        return obs;
    }

    updateEvent(draftEvent: TimeEvent) {
        let obs = this.http.put(`${this.baseUrl}/timeevent/${draftEvent.id}`, JSON.stringify(draftEvent)).cache();

        obs.map(res => res.json())
            .map(this.convertDate)
            .subscribe(timeEvent => {
                const actualEvents =  this._eventsSubject.getValue();
                //let newarray = actualEvents.map( elem => elem.id === event.id ? event : elem );
                const eventIndex = actualEvents.findIndex(
                    (eventItem) => eventItem.id === timeEvent.id
                );
                actualEvents.splice(eventIndex, 1, timeEvent);
                this._eventsSubject.next(this.orderByDate(actualEvents));
            });

        return obs;
    }

    deleteEvent(delEvent: TimeEvent) {
        let obs = this.http.delete(`${this.baseUrl}/timeevent/${delEvent.id}`).cache();

        obs.subscribe(() => {
                const actualEvents =  this._eventsSubject.getValue();
                const eventIndex = actualEvents.findIndex(
                    (eventItem) => eventItem.id === delEvent.id
                );
                actualEvents.splice(eventIndex, 1);
                this._eventsSubject.next(actualEvents);
            });

        return obs;
    }

    private convertDates(eventList: Array<TimeEvent>) {
        eventList.forEach((eventItem) => {
            eventItem.date = eventItem.date.substr(0, 10);
        });
        return eventList;
    }

    private orderByDate(eventList: Array<TimeEvent>) {
        eventList.sort(TimeEventSorter);
        return eventList;
    }

    private convertDate(timeEvent: any) {
        timeEvent.date = (<string>timeEvent.date).substr(0, 10);
        return timeEvent;
    }

}
