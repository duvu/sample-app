import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { EventData } from 'app/shared/models/event-data';
@Injectable()
export class EventService {
    private _http: HttpClient;
    private _router: Router;
    private _url: string;

    constructor(http: HttpClient, router: Router) {
        this._router = router;
        this._http = http;
        this._url = '/api/track/'
    }

    getLiveEvents(): Observable<EventData[]> {
        const url = this._url + 'live';
        return this._http.get<EventData[]>(url);
    }
}
