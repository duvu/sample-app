import { Geofence } from 'app/shared/models/geozone';

export class GeoUtils {
    public static convertGeofence(data: Geofence): Geofence {
        try {
            data.geometry = JSON.parse(data.geometry);
        } catch (e) {
            // not json
        }
        return data;
    }

    public static convertGeometry(data: string) : any {
        try {
            return JSON.parse(data);
        } catch (e) {
            return {type: 'Point', coordinates: [0, 0]}
        }
    }

}