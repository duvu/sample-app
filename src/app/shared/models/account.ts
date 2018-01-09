import { Privilege } from 'app/shared/models/privilege';
import { CompanyLittle } from 'app/shared/models/little/company-little';
import { PrivilegeLittle } from 'app/shared/models/little/privilege-little';

export class Account {
    id: number;
    accountId: string;
    firstName: string;
    lastName: string;
    status: string;
    privileges: Array<PrivilegeLittle>;
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
