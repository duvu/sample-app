import { Injectable } from '@angular/core';
import {Account} from '../shared/models/account';
import {Router} from '@angular/router';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import { Base2Service } from 'app/services/base2.service';
import { AccountRequest } from 'app/shared/models/request/request-account';

export const ACCOUNT_API_URL = '/api/account';

@Injectable()
export class AccountService extends Base2Service<AccountRequest, Account> {
    constructor(private http: HttpClient, private router: Router) {
        super(http, router, ACCOUNT_API_URL);
    }
}
