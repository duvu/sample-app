import { Base2Service } from 'app/shared/services/base2.service';
import { Injectable } from '@angular/core';
import { DcsRequest } from 'app/shared/models/request/dcs-request';
import { Dcs } from 'app/shared/models/dcs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const API_DCS_PATH = '/api/dcs';

@Injectable()
export class DcsService extends Base2Service<DcsRequest, Dcs> {

    constructor(private http: HttpClient, private router: Router) {
        super(http, router, API_DCS_PATH);
    }

}