import { Injectable } from '@angular/core';
import { Base2Service } from 'app/services/base2.service';
import { RequestGeozone } from 'app/models/request/request-geozone';
import { Geofence } from 'app/models/geozone';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const API_GEOZONE_PATH = "/api/geofence";

@Injectable()
export class GeozoneService extends Base2Service<RequestGeozone, Geofence> {

  constructor(private http: HttpClient, private router: Router) {
      super(http, router, API_GEOZONE_PATH);
  }

}
