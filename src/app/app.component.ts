import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppService} from './services/app.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styles: [``]
})
export class AppComponent implements OnInit, OnDestroy {

    constructor(private app: AppService) {

    }

    ngOnInit(): void {
        // init app-service here to populate app-settings
        this.app.init();
    }

    ngOnDestroy(): void {
        // destroy app-service here to store app-settings
        this.app.destroy();
    }
}
