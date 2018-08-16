import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddEditContactComponent } from 'app/main/administration/contact/add-edit-contact/add-edit-contact.component';
import { OptionalColumnContactComponent } from 'app/main/administration/contact/optional-column-contact/optional-column-contact.component';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

    constructor(public dialog: MatDialog) { }

    ngOnInit() {
    }

    dialogColumnOptions() {
        const dialogRef = this.dialog.open(OptionalColumnContactComponent, {
            //
        });
    }

    dialogNewContact() {
        const dialogRef = this.dialog.open(AddEditContactComponent, {
           width: '800px'
        });
        dialogRef.afterClosed().subscribe(
            result => {
                console.log(result);
            }
        )
    }

    applyFilter(value: any) {

    }
}
