import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Account } from '../models/Account';
import {Router} from "@angular/router";
import {AppService} from "../services/app.service";
import {MatSidenav} from "@angular/material";
import {Subscription} from "rxjs/Subscription";
import {ProgressBarService} from "../services/progress-bar.service";

@Component({
    selector: 'main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

    profile: Account;
    mainIcon: string;
    subscription: Subscription;
    loading: boolean;
    @ViewChild(MatSidenav) sideNav: MatSidenav;

    constructor(private app: AppService, private progress: ProgressBarService, private router: Router) {}

    ngOnInit() {
        console.log('initing ...');
        this.mainIcon = 'back';
        this.app.getCurrentAccount().subscribe(
            data => {
                this.profile = data;
            }
        );

        this.subscription = this.progress.showing$.subscribe(
            showing => {
                setTimeout(_ => this.showLoading(showing));
            }
        );
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

    toggleSideNav(): void {
        this.sideNav.toggle();
        if (this.sideNav.opened) {
            this.mainIcon = 'back';
        } else {
            this.mainIcon = 'menu';
        }
    }
}
