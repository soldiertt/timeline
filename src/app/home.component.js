"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var event_list_component_1 = require("./event-list/event-list.component");
var event_detail_component_1 = require("./event-detail/event-detail.component");
var AppComponent = (function () {
    function AppComponent(eventListService) {
        this.eventListService = eventListService;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.events = this.eventListService.events;
        this.resetEvent();
    };
    AppComponent.prototype.resetEvent = function () {
        console.log("resetEvent");
        this.selectedEvent = { participants: [] };
    };
    AppComponent.prototype.selectEvent = function (event) {
        this.selectedEvent = event;
    };
    AppComponent.prototype.saveEvent = function (event) {
        console.log("saveEvent");
        this.eventListService.saveEvent(event);
        // Generally, we would want to wait for the result of `itemsService.saveItem`
        // before resetting the current item.
        this.resetEvent();
    };
    AppComponent.prototype.deleteEvent = function (event) {
        console.log("deleteEvent");
        this.eventListService.deleteEvent(event);
        // Generally, we would want to wait for the result of `itemsService.deleteItem`
        // before resetting the current item.
        this.resetEvent();
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-root',
            templateUrl: 'app.component.html',
            styleUrls: ['app.component.css'],
            directives: [event_list_component_1.EventListComponent, event_detail_component_1.EventDetailComponent]
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map