import { Injectable } from '@angular/core';
import { AbstractService } from 'app/services/abstract.service';
import { AlertProfileRequest } from 'app/models/request/alert-profile.request';
import { AlertProfile } from 'app/models/alert-profile';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export const API_URL = '/api/alert';
@Injectable({
  providedIn: 'root'
})
export class AlertProfileService extends AbstractService<AlertProfileRequest, AlertProfile>{

    constructor(private http: HttpClient, private router: Router) {
        super(http, router, API_URL);
    }
}
