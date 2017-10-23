import { Injectable } from '@angular/core';
import { BaseService } from 'app/services/base.service';
import { Organization } from 'app/models/organization';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export const ORGANIATION_API_URL = '/api/organization';
@Injectable()
export class OrganizationService extends BaseService<Organization> {
    constructor(private http: HttpClient, private router: Router) {
        super(http, router, ORGANIATION_API_URL);
    }
}