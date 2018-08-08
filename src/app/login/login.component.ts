import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'app/services/auth.service';
import { ApplicationContext} from 'app/application-context';
import { WaitingService } from 'app/services/waiting.service';
import { LoginResponse } from 'app/models/login-response';

@Component({
    selector: 'applicationContext-login',
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
                private applicationContext: ApplicationContext) {}

    ngOnInit() {
        if (this.applicationContext.isLoggedIn()) {
            const redirectUrl = this.applicationContext.redirectURL;
            this.router.navigate([redirectUrl]);
        }
    }

    login(): void {
        this.spinner.show(true);
        this.auth.login(this.model.username, this.model.password).subscribe(
            (result: LoginResponse) => {
                this.applicationContext.store(result);
            },
            error => {
                this.errorMessage = 'Error' + error.message;
                this.spinner.show(false);
            },
            () => {
                const redirectUrl = this.applicationContext.getRedirectURL();
                this.spinner.show(false);
                this.router.navigate([redirectUrl]);
            }
        );
    }
}
