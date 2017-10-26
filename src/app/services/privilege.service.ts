import { Injectable } from '@angular/core';
import { BaseService } from 'app/services/base.service';
import { Privilege } from 'app/models/privilege';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export const PRIVILEGE_API_URL = '/api/privilege';

@Injectable()
export class PrivilegeService extends BaseService<Privilege> {

    constructor(private http: HttpClient, private router: Router) {
        super(http, router, PRIVILEGE_API_URL);
    }
}