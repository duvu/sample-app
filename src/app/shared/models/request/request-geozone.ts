import { Geofence } from 'app/shared/models/geozone';

export class RequestGeozone {
    companyId: number;
    accountIds: Array<number>;
    name: string;
    color: string;
    maxSpeedKPH: number;
    isReverseGeozone: boolean;
    isPrivateArea: boolean;
    geometry: string;

}