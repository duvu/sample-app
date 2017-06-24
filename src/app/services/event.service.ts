import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {EventData} from "../models/EventData";
import {AuthHttp} from "angular2-jwt";
import {BaseService} from "./base.service";
import {Router} from "@angular/router";

const API_LOCATION_PATH = "/api/location/";
const APP_LOCATION_PATH = "/m/live";

@Injectable()
export class EventService extends BaseService{

    constructor(private _http: AuthHttp, private _router: Router) {
        super(_router);
    }

    //1. get lives events
    //2. get historical data
    getLiveEvents(): Observable<EventData[]> {
        // return Observable.interval(10000).flatMap(() => this._http.get(API_LOCATION_PATH).map(events => events.json() as EventData[]).catch(this.error));
        return this._http.get(API_LOCATION_PATH)
                .map(events => events.json() as EventData[])
                .catch(this.error);
    }

    getHistoricalData(deviceId: string): Observable<EventData[]> {
        return null;
    }
}
