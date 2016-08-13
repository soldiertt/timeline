"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_1 = require('@angular/core');
var _1 = require('./app/');
var http_1 = require("@angular/http");
var jsonrequestoptions_class_1 = require("./app/config/jsonrequestoptions.class");
var event_list_service_1 = require("./app/event-list/event-list.service");
if (_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.bootstrap(_1.AppComponent, [
    http_1.HTTP_PROVIDERS,
    { provide: 'webApiBaseUrl', useValue: 'http://localhost:3000/restapi' },
    { provide: http_1.RequestOptions, useClass: jsonrequestoptions_class_1.JsonRequestOptions },
    event_list_service_1.EventListService
]);
//# sourceMappingURL=main.js.map