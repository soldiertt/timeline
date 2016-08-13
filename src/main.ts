import {bootstrap} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import {AppComponent, environment} from './app/';
import {RequestOptions, HTTP_PROVIDERS} from "@angular/http";
import {JsonRequestOptions} from "./app/config/jsonrequestoptions.class";
import {EventListService} from "./app/event-list/event-list.service";
import {provideForms, disableDeprecatedForms} from '@angular/forms';
import {TimeEventService} from "./app/time-event.service";

if (environment.production) {
    enableProdMode();
}

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    disableDeprecatedForms(), provideForms(),
    {provide: 'webApiBaseUrl', useValue: 'http://localhost:3000/restapi'},
    {provide: RequestOptions, useClass: JsonRequestOptions},
    EventListService,
    TimeEventService
]);
