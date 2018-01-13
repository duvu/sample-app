import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'app/shared/services/auth.service';
import { AppService} from 'app/shared/services/app.service';
import { ProgressBarService} from 'app/shared/services/progress-bar.service';

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
                private app: AppService) {}

    ngOnInit() {
        if (this.app.isLoggedIn()) {
            const redirectUrl = this.app.getRedirectURL();
            this.router.navigate([redirectUrl]);
        }
    }

    login(): void {
        this.loading = true;
        this.auth.login(this.model.username, this.model.password).subscribe(
            result => {
                this.app.setCurrentAccount(result);
            },
            error => {
                this.errorMessage = 'Error' + error.message;
                this.loading = false;
            },
            () => {
                const redirectUrl = this.app.getRedirectURL();
                this.loading = false;
                this.router.navigate([redirectUrl]);
            }
        );
    }
}
