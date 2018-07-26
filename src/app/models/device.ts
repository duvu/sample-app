import { CompanyLittle } from 'app/models/little/company-little';
import { AccountLittle } from 'app/models/little/account-little';

export class Device {
    public id: number;

    public name: string;
    public deviceId: string;

    public company: CompanyLittle | any;
    public accounts: Array<AccountLittle>;

    status: string;
    expiredOn: Date;

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
    public lastEventTime: Date;
    public createdBy: string;
    public createdOn: Date;
    public updatedBy: string;
    public updatedOn: Date;
}
