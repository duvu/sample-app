import { Injectable } from '@angular/core';
import { BaseService } from 'app/services/base.service';
import { Company } from 'app/shared/models/company';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export const ORGANIATION_API_URL = '/api/company';
@Injectable()
export class CompanyService extends BaseService<Company> {
    constructor(private http: HttpClient, private router: Router) {
        super(http, router, ORGANIATION_API_URL);
    }
}
