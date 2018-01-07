import { Injectable } from '@angular/core';
import {Account} from '../models/response/account';
import {Router} from '@angular/router';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';

export const ACCOUNT_API_URL = '/api/account';

@Injectable()
export class AccountService extends BaseService<Account> {
    constructor(private http: HttpClient, private router: Router) {
        super(http, router, ACCOUNT_API_URL);
    }
}
