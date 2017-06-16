import { Injectable } from '@angular/core';
import {AuthHttp, AuthHttpError} from "angular2-jwt";
import {Observable} from "rxjs";
import {Response} from "@angular/http";
import {Account} from "../../models/Account";
import {Router} from "@angular/router";
import {BaseService} from "../base.service";

const APP_ACCOUNT_PATH: string = '/m/admin/account'
const API_ACCOUNT_PATH: string = '/api/account/';

@Injectable()
export class AccountService extends BaseService {

    constructor(private http: AuthHttp, protected router: Router) {
        super(router);
    }

    getAll() :Observable<Account[]> {
        return this.http.get(API_ACCOUNT_PATH)
            .map(accountList => accountList.json() as Account[])
            .catch(this.error);
    }

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

    toggleStatus(accountId: string) : Observable<Account> {
        let url = API_ACCOUNT_PATH + accountId + "?action=toggle";
        return this.http.get(url)
            .map((account: Response) => account.json())
            .catch(this.error);
    }

    get(accountId: string) : Observable<Account> {
        let url = API_ACCOUNT_PATH + accountId;
        return this.http.get(url)
            .map(account => account.json() as Account)
            .catch(this.error);
    }

    addNew(data: Account): Observable<Account> {
        return this.http.post(API_ACCOUNT_PATH, data)
            .map(account => account.json() as Account)
            .catch(this.error);
    }
    update(data: Account): Observable<Account> {
        let url = API_ACCOUNT_PATH + data.accountID;
        return this.http.post(url, data)
            .map(account => account.json() as Account)
            .catch(this.error)
    }
    //-------------------
    //-- ROUTING
    //-------------------
    routeToList() {
        this.router.navigate([APP_ACCOUNT_PATH]);
    }
    routeToView(accountId: string) {
        this.router.navigate( [APP_ACCOUNT_PATH, accountId], { queryParams: { action: "view" } });
    }
    routeToEdit(accountId: string) {
        this.router.navigate( [APP_ACCOUNT_PATH, accountId], { queryParams: { action: "edit" } });
    }
}
