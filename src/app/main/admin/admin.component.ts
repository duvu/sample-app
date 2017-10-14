import { Component, OnInit } from '@angular/core';
import {NavigationStart, Router} from "@angular/router";

@Component({
    selector: 'gps-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

    constructor(private router: Router) {
        // iconRegistry.addSvgIconSet(
        //     sanitizer.bypassSecurityTrustResourceUrl('assets/icons/icons.svg'));
    }

    ngOnInit() {
        console.log("Init");
        this.router.events.filter(event => event instanceof NavigationStart)
            .subscribe(
                (data: NavigationStart) => {
                    console.log("DATA", data);
                    if (data.url.endsWith('admin')) {
                        this.router.navigate(['m', 'admin', 'account']);
                    }
                }
            );
    }
}
