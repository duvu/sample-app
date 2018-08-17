import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddEditContactComponent } from 'app/main/administration/contact/add-edit-contact/add-edit-contact.component';
import { OptionalColumnContactComponent } from 'app/main/administration/contact/optional-column-contact/optional-column-contact.component';
import { Contact } from 'app/models/contact';
import { ContactRequest } from 'app/models/request/contact.request';
import { ContactService } from 'app/services/contact.service';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

    constructor(public dialog: MatDialog, private contactService: ContactService) { }

    ngOnInit() {
    }

    dialogColumnOptions() {
        const dialogRef = this.dialog.open(OptionalColumnContactComponent, {
            //
        });
        dialogRef.afterClosed().subscribe(
            result => {}
        )
    }

    dialogNewContact() {
        const contact = new Contact();
        const dialogRef = this.dialog.open(AddEditContactComponent, {
           width: '800px',
            data: contact
        });
        dialogRef.afterClosed().subscribe(
            result => {
                this.create(contact);
            }
        )
    }

    create(data: ContactRequest | Contact): void {
        if (data) {
            data.publishInCompany = data.publishInCompany !== undefined;
            this.contactService.create(data).subscribe(
                resp => {
                    console.log('datt', resp);
                }
            );
        }
    }

    applyFilter(value: any) {

    }
}
