import { CompanyLittle } from 'app/shared/models/little/company-little';

export class Device {
    public id: number;

    public name: string;
    public deviceId: string;

    public company: CompanyLittle | any;

    public vehicleId: number;
    public vehicleName: string;

    public ipAddress: string;
    public port: number;

    public protocol: string;
    public serialNumber: string;
    public modelName: string;

    public manufacturerName: string;
    public firmwareVersion: string;
    public originalCountry: string;
    public createdBy: string;
    public createdOn: Date;
    public updatedBy: string;
    public updatedOn: Date;

}
