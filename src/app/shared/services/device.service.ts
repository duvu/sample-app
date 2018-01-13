import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Device} from 'app/shared/models/device';
import { Base2Service } from 'app/shared/services/base2.service';
import { RequestDevice } from 'app/shared/models/request/request-device';

const API_DEVICE_PATH = '/api/device';

@Injectable()
export class DeviceService extends Base2Service<RequestDevice, Device> {
    constructor(private http: HttpClient, private router: Router) {
        super(http, router, API_DEVICE_PATH);
    }

}
