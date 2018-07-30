import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ApplicationContext} from 'app/application-context';
import {LoginResponse} from 'app/models/login-response';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

    profile: LoginResponse | any;

    constructor(private app: ApplicationContext, private router: Router) {}

    ngOnInit() {
    }

    ngOnDestroy(): void {
    }

    logout() {
        this.app.logout();
        this.router.navigate(['/login']);
    }

}
