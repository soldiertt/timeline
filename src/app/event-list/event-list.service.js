"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/**
 * Created by soldi on 31-07-16.
 */
var core_1 = require("@angular/core");
var Rx_1 = require("rxjs/Rx");
var sort_event_util_1 = require("../util/sort-event.util");
var EventListService = (function () {
    function EventListService(baseUrl, http) {
        this.baseUrl = baseUrl;
        this.http = http;
        this._eventsSubject = new Rx_1.BehaviorSubject([]);
        this.events = this._eventsSubject.asObservable();
        this.loadEvents();
    }
    EventListService.prototype.loadEvents = function () {
        var _this = this;
        var obs = this.http.get(this.baseUrl + "/timeevent").cache();
        obs.map(function (res) { return res.json(); })
            .map(this.convertDates)
            .map(this.orderByDate)
            .subscribe(function (events) {
            _this._eventsSubject.next(events);
        });
        return obs;
    };
    EventListService.prototype.saveEvent = function (saveEvent) {
        (saveEvent.id) ? this.updateEvent(saveEvent) : this.createEvent(saveEvent);
    };
    EventListService.prototype.createEvent = function (newEvent) {
        var _this = this;
        var obs = this.http.post(this.baseUrl + "/timeevent", JSON.stringify(newEvent)).cache();
        obs.map(function (res) { return res.json(); })
            .subscribe(function (event) {
            var actualEvents = _this._eventsSubject.getValue();
            actualEvents.push(event);
            _this._eventsSubject.next(actualEvents);
        });
        return obs;
    };
    EventListService.prototype.updateEvent = function (draftEvent) {
        var _this = this;
        var obs = this.http.put(this.baseUrl + "/timeevent/" + draftEvent.id, JSON.stringify(draftEvent)).cache();
        obs.map(function (res) { return res.json(); })
            .map(this.convertDate)
            .subscribe(function (timeEvent) {
            var actualEvents = _this._eventsSubject.getValue();
            //let newarray = actualEvents.map( elem => elem.id === event.id ? event : elem );
            var eventIndex = actualEvents.findIndex(function (eventItem) { return eventItem.id === timeEvent.id; });
            actualEvents.splice(eventIndex, 1, timeEvent);
            _this._eventsSubject.next(actualEvents);
        });
        return obs;
    };
    EventListService.prototype.deleteEvent = function (delEvent) {
        var _this = this;
        var obs = this.http.delete(this.baseUrl + "/timeevent/" + delEvent.id).cache();
        obs.subscribe(function () {
            var actualEvents = _this._eventsSubject.getValue();
            var eventIndex = actualEvents.findIndex(function (eventItem) { return eventItem.id === delEvent.id; });
            actualEvents.splice(eventIndex, 1);
            _this._eventsSubject.next(actualEvents);
        });
        return obs;
    };
    EventListService.prototype.convertDates = function (eventList) {
        eventList.forEach(function (eventItem) {
            eventItem.date = eventItem.date.substr(0, 10);
        });
        return eventList;
    };
    EventListService.prototype.orderByDate = function (eventList) {
        eventList.sort(sort_event_util_1.TimeEventSorter);
        return eventList;
    };
    EventListService.prototype.convertDate = function (timeEvent) {
        timeEvent.date = timeEvent.date.substr(0, 10);
        return timeEvent;
    };
    EventListService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject('webApiBaseUrl'))
    ], EventListService);
    return EventListService;
}());
exports.EventListService = EventListService;
//# sourceMappingURL=event-list.service.js.map