import { Injectable } from '@angular/core';
import {Account} from 'app/models/account';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { Base2Service } from 'app/services/base2.service';
import { AccountRequest } from 'app/models/request/request-account';
import { Observable } from 'rxjs/Rx';

export const ACCOUNT_API_URL = '/api/account';

@Injectable()
export class AccountService extends Base2Service<AccountRequest, Account> {
    constructor(private http: HttpClient, private router: Router) {
        super(http, router, ACCOUNT_API_URL);
    }

    getAllStatus(): Observable<string[]> {
        const url = ACCOUNT_API_URL + '/status';
        return this.http.get<string[]>(url);
    }
}
