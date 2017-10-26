import {Injectable} from '@angular/core';
import { Account } from '../models/account';
import {LoginResponse} from '../models/login-response';

export const CURRENT_USER = 'vd5-current-user';
export const redirectUrl = 'redirectUrl';

@Injectable()
export class AppService {
    redirectURL: string;
    currentAccount: LoginResponse;
    private _access_token: string;

    constructor() {
        console.log('App service is initiating!');
    }

    init(): void {
        try {
            this.currentAccount = JSON.parse(localStorage.getItem(CURRENT_USER));
            this._access_token = this.currentAccount.access_token;
        } catch (e) {
            // console.log("error", e);
        }
        this.redirectURL = localStorage.getItem(redirectUrl);
    }

    destroy(): void {
        localStorage.setItem(CURRENT_USER, JSON.stringify(this.currentAccount));
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


    get access_token(): string {
        return this._access_token;
    }

    set access_token(value: string) {
        this._access_token = value;
    }

    getToken(): string {
        return this.currentAccount.token_type + " " + this.currentAccount.access_token;
    }

    setCurrentAccount(credential: LoginResponse) {
        this.currentAccount = credential;
        localStorage.setItem(CURRENT_USER, JSON.stringify(this.currentAccount));
    }

    logout() {
        this.currentAccount = null;
        this.redirectURL = null;
        localStorage.removeItem(CURRENT_USER);
    }

    isLoggedIn(): boolean {
        return this.currentAccount != null;
    }

    isSysAdmin(): boolean {
        return false;
    }
}
