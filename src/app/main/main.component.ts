import {Component, OnInit, ViewChild} from '@angular/core';
import { Account } from '../models/Account';
import {Router} from "@angular/router";
import {AppService} from "../services/app.service";
import {MatSidenav} from "@angular/material";

@Component({
    selector: 'main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    profile: Account;
    mainIcon: string;

    @ViewChild(MatSidenav) sideNav: MatSidenav;

    constructor(private app: AppService, private router: Router) {}

    ngOnInit() {
        console.log('initing ...');
        this.mainIcon = 'back';
        this.app.getCurrentAccount().subscribe(
            data => {
                this.profile = data;
            }
        );
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
