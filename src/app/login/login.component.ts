import { Component, OnInit} from '@angular/core';
import { AuthService } from "../services/auth/auth.service";
import { Router } from "@angular/router";
import {ProgressBarService} from "../services/progress-bar.service";
import {AppService} from "../services/app.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    model: any = {};
    errorMessage: string;

    constructor(private auth: AuthService,
                private router: Router,
                private app: AppService,
                private progress: ProgressBarService) {}

    ngOnInit() {
        if (this.app.isLoggedIn()) {
            const redirectUrl = this.app.getRedirectURL();
            this.router.navigate([redirectUrl]);
        }
    }

    login(): void {
        this.progress.show();
        this.auth.login(this.model.username, this.model.password).subscribe(
            result => {
                this.app.setCurrentAccount(result);
            },
            error => {
                this.errorMessage = "Error" + error;
                this.progress.hide();
            },
            () => {
                const redirectUrl = this.app.getRedirectURL();
                this.progress.hide();
                this.router.navigate([redirectUrl]);
            }
        );
    }
}
