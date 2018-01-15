/**
 * Created by beou on 6/2/17.
 */
export interface EventData {
    id: number;
    companyId: number; // company-id in db
    companyName: string;
    devId: number; // device-id in db
    deviceId: string,
    deviceName: string,
    latitude: number;
    longitude: number;
    altitude: number;
    address: string;
    timestamp: number
    speedKPH: number;
    heading: number;
}
