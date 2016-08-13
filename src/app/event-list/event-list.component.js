"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var EventListComponent = (function () {
    function EventListComponent() {
        this.selected = new core_1.EventEmitter();
        this.deleted = new core_1.EventEmitter();
    }
    EventListComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input()
    ], EventListComponent.prototype, "events");
    __decorate([
        core_1.Output()
    ], EventListComponent.prototype, "selected");
    __decorate([
        core_1.Output()
    ], EventListComponent.prototype, "deleted");
    EventListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-event-list',
            templateUrl: 'event-list.component.html',
            styleUrls: ['event-list.component.css']
        })
    ], EventListComponent);
    return EventListComponent;
}());
exports.EventListComponent = EventListComponent;
//# sourceMappingURL=event-list.component.js.map