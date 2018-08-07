import { CompanyLittle } from 'app/models/little/company-little';
import { Role } from 'app/models/role';

export class Account {
    id: number;
    accountId: string;
    firstName: string;
    lastName: string;
    status: string;
    privilege: Role;
    company: CompanyLittle | any;
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
