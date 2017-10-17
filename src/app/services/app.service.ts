import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { Account } from '../models/Account';

@Injectable()
export class AppService {
    private redirectURL: string;

    constructor() { }

    getCurrentAccount(): Observable<Account> {
        return new Observable<Account>(
            observer => {
                let storedAccount = localStorage.getItem('currentUser');
                let acc: Account = JSON.parse(storedAccount);
                observer.next(acc);
                observer.complete();
            }
        );
    }

    setRedirectURL (url: string) {
        this.redirectURL = url;
    }
    getRedirectURL() {
        return (this.redirectURL ? this.redirectURL : '/main');
    }


    setCurrentAccount(credential: any) {
        localStorage.setItem('currentUser', JSON.stringify(credential));
    }

    logout() {
        localStorage.removeItem('currentUser');
    }

    isLoggedIn(): boolean {
        try {
            const profile = JSON.parse(localStorage.getItem('currentUser'));
            return profile != null;
        } catch (e) {
            // console.log("error", e);
        }
        return false;
    }
}
