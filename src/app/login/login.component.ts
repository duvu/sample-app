import { Component, OnInit} from '@angular/core';
import { AuthService } from "../services/auth/auth.service";
import { Router } from "@angular/router";
import {ProgressBarService} from "../services/progress-bar.service";


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
                private progress: ProgressBarService) {}

    ngOnInit() {
        if (this.auth.isLoggedIn()) {
            const redirectUrl = this.auth.getRedirectURL();
            this.router.navigate([redirectUrl]);
        }
    }

    login(): void {
        this.progress.show();
        this.auth.login(this.model.username, this.model.password).subscribe(
            result => {
                localStorage.setItem('currentUser', JSON.stringify(result));
            },
            error => {
                this.errorMessage = "Error" + error;
                this.progress.hide();
            },
            () => {
                const redirectUrl = this.auth.getRedirectURL();
                console.log("RedirectUrl", redirectUrl);
                this.progress.hide();
                this.router.navigate([redirectUrl]);
            }
        );
    }
}
