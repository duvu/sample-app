import { Privilege } from 'app/models/privilege';

export class Account {
    id: number;
    accountId: string;
    firstName: string;
    lastName: string;
    status: string;
    privileges: Array<Privilege>;
    companyId: number;
    companyName: string;
    phoneNumber: string;
    photoUrl: string;
    emailAddress: string;
    addressLine1: string;
    addressLine2: string;
    notes: string;
    createdBy: string;
    updatedBy: string;
    createdOn: Date;
    updatedOn: Date;
}
