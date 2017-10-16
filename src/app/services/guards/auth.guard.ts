import { Injectable } from '@angular/core';
import {
    CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route,
    CanActivateChild, Router, NavigationExtras
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AppService} from "../app.service";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private app: AppService, private router: Router) {}
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.canActivate(childRoute, state);
    }
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
            let url: string = state.url;
            return this.checkLogin(url);
    }
    checkLogin(url: string): boolean {
        if (this.app.isLoggedIn()) {return true;}

        //store the attempted URL for redirecting
        this.app.setRedirectURL(url);
        //create session_id
        let sessionId=12345567;
        //Set our navigation extras object
        //that contains our global query params and fragment
        let navigationExtras: NavigationExtras = {
            queryParams: { 'session_id': sessionId },
            fragment: 'anchor'
        }
        this.router.navigate(['/login'], navigationExtras);
        return false;
    }
}
