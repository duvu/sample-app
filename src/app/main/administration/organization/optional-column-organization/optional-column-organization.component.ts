import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-optional-column-organization',
    templateUrl: './optional-column-organization.component.html',
    styleUrls: ['./optional-column-organization.component.scss']
})
export class OptionalColumnOrganizationComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<OptionalColumnOrganizationComponent>,
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
