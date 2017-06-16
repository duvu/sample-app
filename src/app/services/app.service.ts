import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { Account } from '../models/Account';
import {AuthService} from "./auth/auth.service";
@Injectable()
export class AppService {

    constructor(private auth: AuthService) { }
    getCurrentAccount(): Observable<Account> {
        return new Observable<Account>(
            observer => {
                let storedAccount = localStorage.getItem('profile_current');
                let acc: Account = JSON.parse(storedAccount);
                observer.next(acc);
                observer.complete();
            }
        );
    }
    logout() {
        this.auth.logout();
    }
}
