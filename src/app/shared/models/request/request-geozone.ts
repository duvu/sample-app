import { Geofence } from 'app/shared/models/geozone';
import { AccountLittle } from 'app/shared/models/little/account-little';

export class RequestGeozone {
    companyId: number;
    accountIds: Array<number>;
    name: string;
    color: string;
    maxSpeedKPH: number;
    reverseGeozone: boolean;
    privateArea: boolean;
    geometry: string;

    // id: number;
    // companyId: number;
    // accounts: Array<AccountLittle>;
    // name: string;
    // color: string;
    // maxSpeedKPH: number;
    // reverseGeozone: boolean;
    // privateArea: boolean;
    // geometry: string | any;
    updateFromGeofence(selectedGeofence: Geofence | any) {
        this.name = selectedGeofence.name;
        this.color = selectedGeofence.color;
        this.maxSpeedKPH = selectedGeofence.maxSpeedKPH;
        this.privateArea = selectedGeofence.privateArea;
        this.reverseGeozone = selectedGeofence.reverseGeozone;
        this.geometry = JSON.stringify(selectedGeofence.geometry);
    }
}