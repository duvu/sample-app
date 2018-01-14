import { Device } from 'app/shared/models/device';
import * as _ from 'lodash';

export class RequestDevice {
    public id: number;

    public name: string;
    public deviceId: string;

    public companyId: number;
    public accountIds: Array<number>;

    public vehicleId: number;

    public ipAddress: string;
    public port: number;

    public protocol: string;
    public serialNumber: string;
    public modelName: string;

    public manufacturerName: string;
    public firmwareVersion: string;
    public originalCountry: string;


    constructor(device?: Device) {
        this.id = device.id;
        this.name = device.name;
        this.deviceId = device.deviceId;
        this.companyId = device.company ? device.company.id : null;
        this.accountIds = _.map(device.accounts, (acc) => {
            return acc.id;
        });

        this.vehicleId = device.vehicleId;
        this.ipAddress = device.ipAddress;
        this.port = device.port;
        this.protocol = device.protocol;
        this.serialNumber = device.serialNumber;
        this.modelName = device.modelName;
        this.manufacturerName = device.manufacturerName;
        this.firmwareVersion = device.firmwareVersion;
        this.originalCountry = device.originalCountry;
    }
}
