import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'app/services/auth.service';
import { ApplicationContext} from 'app/application-context';
import { WaitingService } from 'app/services/waiting.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    model: any = {};
    errorMessage: string;

    loading: boolean = false;

    constructor(private auth: AuthService,
                private router: Router,
                private spinner: WaitingService,
                private app: ApplicationContext) {}

    ngOnInit() {
        if (this.app.isLoggedIn()) {
            const redirectUrl = this.app.getRedirectURL();
            this.router.navigate([redirectUrl]);
        }
    }

    login(): void {
        this.spinner.show(true);
        this.auth.login(this.model.username, this.model.password).subscribe(
            result => {
                this.app.setCurrentAccount(result);
            },
            error => {
                this.errorMessage = 'Error' + error.message;
                this.spinner.show(false);
            },
            () => {
                const redirectUrl = this.app.getRedirectURL();
                this.spinner.show(false);
                this.router.navigate([redirectUrl]);
            }
        );
    }
}
