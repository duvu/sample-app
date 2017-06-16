import { Component, OnInit, NgZone, Renderer2, ElementRef, ViewChild} from '@angular/core';
import { AuthService } from "../../services/auth/auth.service";
import { Router, Event as RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from "@angular/router";


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    cred: any = {};
    errorMessage: string;

    @ViewChild('spinnerElem') spinnerElem: ElementRef;
    @ViewChild('loginForm') loginForm: ElementRef;

    constructor(private auth: AuthService, private router: Router, private ngZone: NgZone, private renderer: Renderer2) {
        router.events.subscribe(
            (event: RouterEvent) => {
                this._navigationInterceptor(event);
            }
        );
    }

    ngOnInit() {
        if (this.auth.isLoggedIn()) {
            let redirectURL = this.auth.getRedirectURL();
            this.router.navigate([redirectURL]);
        }
    }

    //-------------------------------------------------------------------------
    // Show and Hide spinner
    //-------------------------------------------------------------------------
    private _navigationInterceptor(event: RouterEvent): void {
        if (event instanceof NavigationStart) {
            this.ngZone.runOutsideAngular(() => {
                this.renderer.setStyle(this.spinnerElem.nativeElement, 'opacity', 1);
                this.renderer.setStyle(this.loginForm.nativeElement, 'opacity', 0);
            });
        }
        if (event instanceof NavigationEnd) {
            this._hideSpinner();
        }
    }
    private _hideSpinner(): void {
        this.ngZone.runOutsideAngular(() => {
            this.renderer.setStyle(this.spinnerElem.nativeElement, 'opacity', 0);
            this.renderer.setStyle(this.loginForm.nativeElement, 'opacity', 1);
        });
    }

    onSubmit() {
        this.auth.login(this.cred.accountId, this.cred.password)
        .subscribe(
            result => {
                if (result == true) {
                    let redirectURL = this.auth.getRedirectURL();// ? this.auth.getRedirectURL() : '/m/admin';
                    console.log('redirectURL', redirectURL);
                    this.router.navigate([redirectURL]);
                } else {
                    this.errorMessage = "Username or password is incorrect";
                }
                return false;
            },
            error => {
                this.errorMessage = "Error" + error;
            },
            () => {
                return false;
            }
        );
    }
}
