import { Account } from 'app/shared/models/account';
import * as _ from 'lodash';

export class AccountRequest {
    id: number;
    accountId: string;
    firstName: string;
    lastName: string;
    status: string;
    privilegeIds: Array<number>;
    companyId: number;
    companyName: string;
    phoneNumber: string;
    photoUrl: string;
    emailAddress: string;
    addressLine1: string;
    addressLine2: string;
    notes: string;


    constructor(account? : Account) {
        if (account) {
            this.id = account.id;
            this.accountId = account.accountId;
            this.firstName = account.firstName;
            this.lastName = account.lastName;
            this.status = account.status;
            this.privilegeIds = _.map(account.privileges, (privilege) => {
                return privilege.id;
            });
            this.companyId = account.company ? account.company.id : null;
            this.companyName = account.company ? account.company.name : null;
            this.phoneNumber = account.phoneNumber;
            this.photoUrl = account.photoUrl;
            this.emailAddress = account.emailAddress;
            this.addressLine1 = account.addressLine1;
            this.addressLine2 = account.addressLine2;
            this.notes = account.notes;
        } else {
            this.privilegeIds = [];
        }
    }
}
