import {Injectable} from '@angular/core';
import {LoginResponse} from '../models/response/login-response';

import * as jwt from 'jwt-decode';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/distinctUntilChanged';


export const CURRENT_USER = 'vd5-current-user';
export const redirectUrl = 'redirectUrl';

@Injectable()
export class AppService {
    redirectURL: string;

    private currentUserSubject = new BehaviorSubject<LoginResponse>(new LoginResponse());
    public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

    constructor() {
        console.log('App service is initiating!');
    }

    init(): void {
        try {
            const currentAccount = JSON.parse(localStorage.getItem(CURRENT_USER));
            if (currentAccount != null) {
                this.currentUserSubject.next(currentAccount);
            }
        } catch (e) {
            // console.log("error", e);
        }
        this.redirectURL = localStorage.getItem(redirectUrl);
    }

    destroy(): void {
        localStorage.setItem(CURRENT_USER, JSON.stringify(this.getCurrentAccount()));
        localStorage.setItem(redirectUrl, this.redirectURL);
    }

    getCurrentAccount(): LoginResponse {
        return this.currentUserSubject.getValue();
    }

    setRedirectURL (url: string) {
        this.redirectURL = url;
    }
    getRedirectURL() {
        return (this.redirectURL ? this.redirectURL : '/main');
    }

    getToken(): string {
        return this.getCurrentAccount().token_type + " " + this.getCurrentAccount().access_token;
    }

    setCurrentAccount(credential: LoginResponse) {
        localStorage.setItem(CURRENT_USER, JSON.stringify(credential));
        this.currentUserSubject.next(credential);
    }

    logout() {
        //this.currentAccount = null;
        this.currentUserSubject.next(null);
        this.redirectURL = null;
        localStorage.removeItem(CURRENT_USER);
    }

    isLoggedIn(): boolean {
        if (this.getCurrentAccount() != null && this.getCurrentAccount().access_token) {
            const decoded: any = jwt(this.getCurrentAccount().access_token);
            return decoded.exp > Date.now()/1000;
        } else {
            return false;
        }
    }
}
