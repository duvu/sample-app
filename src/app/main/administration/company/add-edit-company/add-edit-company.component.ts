import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-add-edit-organization',
    templateUrl: './add-edit-company.component.html',
    styleUrls: ['./add-edit-company.component.scss']
})
export class AddEditCompanyComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<AddEditCompanyComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
    }

    cancel(): void {
        this.dialogRef.close();
    }

    onSave(): void {
        this.dialogRef.close(this.data);
    }
}
