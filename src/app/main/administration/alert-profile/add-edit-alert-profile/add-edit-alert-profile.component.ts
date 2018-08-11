import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'add-edit-alert-profile',
    templateUrl: './add-edit-alert-profile.component.html',
    styleUrls: ['./add-edit-alert-profile.component.scss']
})
export class AddEditAlertProfileComponent implements OnInit {

    isEditing: boolean = false;
    constructor(
        public dialogRef: MatDialogRef<AddEditAlertProfileComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit() {
    }

    cancel(): void {
        this.dialogRef.close();
    }

    save(): void {

    }
}
