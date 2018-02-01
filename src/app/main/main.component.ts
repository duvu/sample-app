import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AppService} from '../shared/services/app.service';
import {MatSidenav} from '@angular/material';
import {Subscription} from 'rxjs/Subscription';
import {ProgressBarService} from '../shared/services/progress-bar.service';
import {LoginResponse} from '../shared/models/login-response';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

    profile: LoginResponse | any;
    subscription: Subscription;
    loading: boolean;

    @ViewChild(MatSidenav) sideNav: MatSidenav;

    constructor(private app: AppService, private progress: ProgressBarService, private router: Router) {}

    ngOnInit() {
        this.profile = this.app.getCurrentAccount();
        this.subscription = this.progress.showing$.subscribe(
            showing => {
                setTimeout(_ => this.showLoading(showing));
            }
        );
        this.router.navigate(['main', 'tracking']);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }

    showLoading(showing): void {
        this.loading = showing;
    }

    logout() {
        this.app.logout();
        this.router.navigate(['/login']);
    }

}
