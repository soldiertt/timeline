"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var eventtype_enum_1 = require("../model/eventtype.enum");
var enum_util_class_1 = require("../config/enum-util.class");
var EventDetailComponent = (function () {
    function EventDetailComponent() {
        this.saved = new core_1.EventEmitter();
        this.cancelled = new core_1.EventEmitter();
    }
    Object.defineProperty(EventDetailComponent.prototype, "_event", {
        set: function (value) {
            if (value)
                this.originalTitle = value.title;
            // CLONE DEEP
            this.selectedEvent = Object.assign({}, value);
            this.selectedEvent.participants = value.participants.slice();
            console.log(this.selectedEvent);
        },
        enumerable: true,
        configurable: true
    });
    EventDetailComponent.prototype.ngOnInit = function () {
        this.eventTypes = enum_util_class_1.EnumUtil.getNames(eventtype_enum_1.EventType);
        this.persons = [{ id: 1, firstname: "Jean-Louis", lastname: "Bourlet" }, { id: 2, firstname: "Maylee", lastname: "Bourlet" }];
    };
    EventDetailComponent.prototype.addParticipant = function () {
        var _this = this;
        var index = this.selectedEvent.participants.findIndex(function (part) { return part.id === _this.newParticipant.id; });
        if (index === -1) {
            this.selectedEvent.participants.push(this.newParticipant);
        }
    };
    EventDetailComponent.prototype.deleteParticipant = function (participant, $event) {
        var objIndex = this.selectedEvent.participants.indexOf(participant);
        this.selectedEvent.participants.splice(objIndex, 1);
        $event.preventDefault();
    };
    __decorate([
        core_1.Input('event')
    ], EventDetailComponent.prototype, "_event");
    __decorate([
        core_1.Output()
    ], EventDetailComponent.prototype, "saved");
    __decorate([
        core_1.Output()
    ], EventDetailComponent.prototype, "cancelled");
    EventDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-event-detail',
            templateUrl: 'event-detail.component.html',
            styleUrls: ['event-detail.component.css']
        })
    ], EventDetailComponent);
    return EventDetailComponent;
}());
exports.EventDetailComponent = EventDetailComponent;
//# sourceMappingURL=event-detail.component.js.map