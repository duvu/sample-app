import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ContactRequest } from 'app/models/request/contact.request';

@Component({
    selector: 'app-add-edit-contact',
    templateUrl: './add-edit-contact.component.html',
    styleUrls: ['./add-edit-contact.component.scss']
})
export class AddEditContactComponent implements OnInit {

    isEditing = false;
    constructor(public dialogRef: MatDialogRef<AddEditContactComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
    }

    cancel() {
        this.dialogRef.close();
    }
    onSave() {
        //const request = new ContactRequest(this.data);
        this.dialogRef.close(true);
    }
}
