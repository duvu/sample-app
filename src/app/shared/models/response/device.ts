import { CompanyLittle } from 'app/shared/models/little/company-little';

export class Device {
    private id: number;

    private name: string;
    private deviceId: string;

    private company: CompanyLittle | any;

    private vehicleId: number;
    private vehicleName: string;

    private ipAddress: string;
    private port: number;

    private protocol: string;
    private serialNumber: string;
    private modelName: string;

    private manufacturerName: string;
    private firmwareVersion: string;
    private originalCountry: string;
    private createdBy: string;
    private createdOn: Date;
    private updatedBy: string;
    private updatedOn: Date;

}
