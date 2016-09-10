import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule, RequestOptions }    from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent }         from './app.component';
import { HomeComponent }         from './home.component';
import { EventListComponent }   from './event-list/event-list.component';
import { EventDetailComponent }      from './event-detail/event-detail.component';
import { EventListService }  from './event-list/event-list.service';
import { routing }              from './app.routing';
import { TimeEventService } from "./time-event.service";
import { JsonRequestOptions } from "./config/jsonrequestoptions.class";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        NgbModule,
        routing
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        EventListComponent,
        EventDetailComponent
    ],
    providers: [
        {provide: 'webApiBaseUrl', useValue: 'http://localhost:3000/restapi'},
        {provide: RequestOptions, useClass: JsonRequestOptions},
        EventListService,
        TimeEventService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}





