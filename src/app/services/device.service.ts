import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Device} from "../models/device";

const API_DEVICE_PATH = '/api/device/';

@Injectable()
export class DeviceService extends BaseService<Device> {
    constructor(private http: HttpClient, private router: Router) {
        super(http, router, API_DEVICE_PATH);
    }

}
