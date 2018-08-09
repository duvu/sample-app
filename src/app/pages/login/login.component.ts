import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'app/services/auth.service';
import { ApplicationContext} from 'app/application-context';
import { WaitingService } from 'app/services/waiting.service';
import { LoginResponse } from 'app/models/login-response';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    model: any = {};

    constructor(private auth: AuthService,
                private router: Router,
                private spinner: WaitingService,
                private applicationContext: ApplicationContext) {}

    ngOnInit() {
        if (this.applicationContext.isLoggedIn()) {
            const redirectUrl = this.applicationContext.getRedirectURL();
            this.router.navigate([redirectUrl]);
        }
    }

    login(): void {
        this.spinner.show(true);
        this.auth.login(this.model.username, this.model.password).subscribe(
            (result: LoginResponse) => {
                this.spinner.show(false);
                this.applicationContext.store(result);
                const redirectUrl = this.applicationContext.getRedirectURL();
                this.router.navigate([redirectUrl]);
            },
            (err: HttpErrorResponse) => {
                this.applicationContext.error(err.error.error_description);
                this.spinner.show(false);
            },
            () => {}
        );
    }
}
