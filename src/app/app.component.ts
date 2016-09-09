import {Component, OnInit, ViewContainerRef} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

    viewContainerRef: ViewContainerRef;

    constructor(viewContainerRef: ViewContainerRef) {
      this.viewContainerRef = viewContainerRef;
    }

    ngOnInit() {

    }

}
