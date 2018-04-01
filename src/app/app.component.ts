import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApplicationContext} from './shared/services/application-context.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styles: [``]
})
export class AppComponent {

    constructor() {}
}
