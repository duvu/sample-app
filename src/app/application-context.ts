import { Injectable, OnDestroy, OnInit } from '@angular/core';
import {LoginResponse} from 'app/models/login-response';

import * as jwt from 'jwt-decode';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/distinctUntilChanged';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';


export const CURRENT_USER = 'vd5-current-user';
export const redirectUrl = 'redirectUrl';
const DEFAULT_REDIRECT_URL = '/main/tracking';

@Injectable()
export class ApplicationContext implements OnInit, OnDestroy {

    get redirectURL(): string {
        return this._redirectURL? this._redirectURL : DEFAULT_REDIRECT_URL;
    }

    set redirectURL(value: string) {
        this._redirectURL = value;
    }

    get access_token(): string {
        return this._access_token;
    }

    set access_token(value: string) {
        this._access_token = value;
    }

    get accountId(): number {
        return this._accountId;
    }

    set accountId(value: number) {
        this._accountId = value;
    }

    get accountName(): string {
        return this._accountName;
    }

    set accountName(value: string) {
        this._accountName = value;
    }

    get authorities(): Array<string> {
        return this._authorities;
    }

    set authorities(value: Array<string>) {
        this._authorities = value;
    }

    get expires_in(): number {
        return this._expires_in;
    }

    set expires_in(value: number) {
        this._expires_in = value;
    }

    get jti(): string {
        return this._jti;
    }

    set jti(value: string) {
        this._jti = value;
    }

    get companyId(): number {
        return this._companyId;
    }

    set companyId(value: number) {
        this._companyId = value;
    }

    get organizationName(): string {
        return this._organizationName;
    }

    set organizationName(value: string) {
        this._organizationName = value;
    }

    get scope(): string {
        return this._scope;
    }

    set scope(value: string) {
        this._scope = value;
    }

    get token_type(): string {
        return this._token_type;
    }

    set token_type(value: string) {
        this._token_type = value;
    }

    private _redirectURL: string;

    private _access_token: string;
    private _accountId: number;
    private _accountName: string;
    private _authorities: Array<string>;
    private _expires_in: number;
    private _jti: string;
    private _companyId: number;
    private _organizationName: string;
    private _scope: string;
    private _token_type: string;

    private _currentUserSubject = new BehaviorSubject<LoginResponse>(new LoginResponse());

    constructor(private snackBar: MatSnackBar) {
        try {
            const currentAccount = JSON.parse(localStorage.getItem(CURRENT_USER));
            if (currentAccount != null) {
                this._currentUserSubject.next(currentAccount);
            }
        } catch (e) {
            // console.log("error", e);
        }
        this.populate();
    }

    ngOnInit(): void {

    }

    store(result?: LoginResponse): void {
        if (result) {
            this.access_token       = result.access_token;
            this.accountId          = result.accountId;
            this.accountName        = result.accountName;
            this.authorities        = result.authorities;
            this.expires_in         = result.expires_in;
            this.jti                = result.jti;
            this.companyId          = result.companyId;
            this.organizationName   = result.organizationName;
            this.scope              = result.scope;
            this.token_type         = result.token_type;
        }

        localStorage.setItem('ACCESS_TOKEN', this.access_token);
        localStorage.setItem('ACCOUNT_ID', String(this.accountId));
        localStorage.setItem('ACCOUNT_NAME', this.accountName);
        localStorage.setItem('AUTHORITIES', JSON.stringify(this.authorities));
        localStorage.setItem('EXPIRES_IN', String(this.expires_in));
        localStorage.setItem('JTI', String(this.jti));
        localStorage.setItem('COMPANY_ID', String(this.companyId));
        localStorage.setItem('ORGANIZATION_NAME', this.organizationName);
        localStorage.setItem('SCOPE', this.scope);
        localStorage.setItem('TOKEN_TYPE', this.token_type);

        localStorage.setItem(redirectUrl, this.redirectURL);
    }

    populate(): void {
        try {
            this.access_token       = localStorage.getItem('ACCESS_TOKEN');
            this.accountId          = parseInt(localStorage.getItem('ACCOUNT_ID'), 10);
            this.accountName        = localStorage.getItem('ACCOUNT_NAME');
            this.authorities        = JSON.parse(localStorage.getItem('AUTHORITIES'));
            this.expires_in         = parseInt(localStorage.getItem('EXPIRES_IN'), 10);
            this.jti                = localStorage.getItem('JTI');
            this.companyId          = parseInt(localStorage.getItem('COMPANY_ID'), 10);
            this.organizationName   = localStorage.getItem('ORGANIZATION_NAME');
            this.scope              = localStorage.getItem('SCOPE');
            this.token_type         = localStorage.getItem('TOKEN_TYPE');

            this.redirectURL = localStorage.getItem(redirectUrl);
        } catch (e) {
            console.log(e);
        }

    }

    clear(): void {
        this.access_token       = null;
        this.accountId          = null;
        this.accountName        = null;
        this.authorities        = null;
        this.expires_in         = null;
        this.jti                = null;
        this.companyId          = null;
        this.organizationName   = null;
        this.scope              = null;
        this.token_type         = null;

        localStorage.setItem('ACCESS_TOKEN', this.access_token);
        localStorage.setItem('ACCOUNT_ID', String(this.accountId));
        localStorage.setItem('ACCOUNT_NAME', this.accountName);
        localStorage.setItem('AUTHORITIES', JSON.stringify(this.authorities));
        localStorage.setItem('EXPIRES_IN', String(this.expires_in));
        localStorage.setItem('JTI', String(this.jti));
        localStorage.setItem('COMPANY_ID', String(this.companyId));
        localStorage.setItem('ORGANIZATION_NAME', this.organizationName);
        localStorage.setItem('SCOPE', this.scope);
        localStorage.setItem('TOKEN_TYPE', this.token_type);
    }

    getCurrentAccount(): LoginResponse {
        return this._currentUserSubject.getValue();
    }

    setRedirectURL (url: string) {
        this.redirectURL = url;
    }
    getRedirectURL() {
        return (this.redirectURL ? this.redirectURL : DEFAULT_REDIRECT_URL);
    }

    getToken(): string {
        return this.getCurrentAccount().token_type + " " + this.getCurrentAccount().access_token;
    }

    setCurrentAccount(credential: LoginResponse) {
        localStorage.setItem(CURRENT_USER, JSON.stringify(credential));
        this._currentUserSubject.next(credential);
    }

    logout() {
        this._currentUserSubject.next(null);
        this.redirectURL = null;
        this.clear();
    }

    isLoggedIn(): boolean {
        if (this.access_token) {
            const decoded: any = jwt(this.access_token);
            return decoded.exp > Date.now()/1000;
        } else {
            return false;
        }
    }

    ngOnDestroy(): void {
        localStorage.setItem(CURRENT_USER, JSON.stringify(this.getCurrentAccount()));
        this.store()

    }

    //------------------------------------------------------------------------------------------------------------------
    //-- toast
    //------------------------------------------------------------------------------------------------------------------
    info(message: string): void {
        const config = this._createConfig(false);
        this.snackBar.open(message, null, config);
    }

    error(message: string): void {
        const config = this._createConfig(true);
        this.snackBar.open(message, null, config);
    }

    private _createConfig(isError?: boolean) {
        const config = new MatSnackBarConfig();
        config.verticalPosition = 'bottom';
        config.horizontalPosition = 'right';
        config.duration = 3000;
        if (isError) {
            config.panelClass = ['toast-warn'];
        } else {
            config.panelClass = ['toast-info'];
        }
        return config;
    }
}
