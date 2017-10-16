import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProgressBarService} from "./services/progress-bar.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styles: [``]
})
export class AppComponent implements OnInit, OnDestroy {

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }

    constructor() {

    }
}
