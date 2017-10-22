import {Injectable} from '@angular/core';
import { Account } from '../models/account';
import {LoginResponse} from '../models/login-response';

export const currentUser = 'currentUser';
export const redirectUrl = 'redirectUrl';

@Injectable()
export class AppService {
    private redirectURL: string;

    currentAccount: LoginResponse;

    constructor() {
        console.log('App service is initiating!');
    }

    init(): void {
        try {
            this.currentAccount = JSON.parse(localStorage.getItem(currentUser));
        } catch (e) {
            // console.log("error", e);
        }
        this.redirectURL = localStorage.getItem(redirectUrl);
    }

    destroy(): void {
        localStorage.setItem(currentUser, JSON.stringify(this.currentAccount));
        localStorage.setItem(redirectUrl, this.redirectURL);
    }

    getCurrentAccount(): LoginResponse {
        return this.currentAccount
    }

    setRedirectURL (url: string) {
        this.redirectURL = url;
    }
    getRedirectURL() {
        return (this.redirectURL ? this.redirectURL : '/main');
    }


    setCurrentAccount(credential: LoginResponse) {
        this.currentAccount = credential;
    }

    logout() {
        this.currentAccount = null;
        this.redirectURL = null;
    }

    isLoggedIn(): boolean {
        return this.currentAccount != null;
    }

    isSysAdmin(): boolean {
        return false;
    }
}
