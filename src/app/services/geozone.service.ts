import { Injectable } from '@angular/core';
import { Base2Service } from 'app/services/base2.service';
import { GeozoneRequest } from 'app/models/request/geozone.request';
import { Geofence } from 'app/models/geozone';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const API_GEOZONE_PATH = "/api/geofence";

@Injectable()
export class GeozoneService extends Base2Service<GeozoneRequest, Geofence> {

  constructor(private http: HttpClient, private router: Router) {
      super(http, router, API_GEOZONE_PATH);
  }

}
