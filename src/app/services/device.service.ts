import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Device} from "../models/Device";
import {BaseService} from "./base.service";
import {Router} from "@angular/router";
import {AuthHttp} from "angular2-jwt";

//-- get all device
//-- get a device
//-- create a device
//-- update a device
//-- delete a device
const APP_DEVICE_PATH = '/m/admin/device/';
const API_DEVICE_PATH = '/api/device/';

@Injectable()
export class DeviceService extends BaseService{

    constructor(private _router: Router, private _http: AuthHttp) {
        super(_router);
    }

    getAll(): Observable<Device[]> {
        return this._http.get(API_DEVICE_PATH)
            .map(devices => devices.json() as Device[])
            .catch(this.error);
    }
    toggle(deviceId: string): Observable<Device> {
        let url = API_DEVICE_PATH + deviceId + "?action=toggle";
        return this._http.get(url)
            .map(device => device.json() as Device)
            .catch(this.error);
    }
    getById(deviceId: string): Observable<Device> {
        return null;
    }
    add(data: Device): Observable<Device> {
        return this._http.post(API_DEVICE_PATH, data)
            .map(device => device.json() as Device)
            .catch(this.error);
    }
    update(data: Device): Observable<Device> {
        return null;
    }
    destroy(deviceId: string): Observable<Device> {
        let url = API_DEVICE_PATH + deviceId;
        return this._http.delete(url)
            .map(device => {
                return device.json() as Device;
            }).catch(this.error);
    }

    /**************************************************************************/
    /* Routing                                                                */
    /**************************************************************************/
    routeToList(): void {
        this._router.navigate([APP_DEVICE_PATH]);
    }
}
