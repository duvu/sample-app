import { Contact } from 'app/models/contact';

export class ContactRequest {

    name: string;
    description: string;
    title: string;
    firstName: string;
    lastName: string;
    publishInCompany: boolean;
    phoneNumber: string;
    emailAddress: string;
    addressLine1: string;
    addressLine2: string;

    constructor(contact: Contact) {
        if (contact) {
            this.name = contact.name;
            this.description = contact.description;
            this.title = contact.title;
            this.firstName = contact.firstName;
            this.lastName = contact.lastName;
            this.publishInCompany = contact.publishInCompany;
            this.phoneNumber = contact.phoneNumber;
            this.emailAddress = contact.emailAddress;
            this.addressLine1 = contact.addressLine1;
            this.addressLine2 = contact.addressLine2;

        }
    }
}
