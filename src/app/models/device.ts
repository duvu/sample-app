import { CompanyLittle } from 'app/models/little/company-little';

export class Device {
    id: number;

    nane: string;
    deviceId: string;

    company: CompanyLittle;

    vehicleId: number;
    vehicleName: string;

    ipAddress: string;
    port: number;

    protocol: string;
    serialNumber: string;
    modelName: string;

    manufacturerName: string;
    firmwareVersion: string;
    originalCountry: string;
    createdBy: string;
    createdOn: Date;
    updatedBy: string;
    updatedOn: Date;
}
