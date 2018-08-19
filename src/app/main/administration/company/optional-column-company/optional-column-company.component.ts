import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-optional-column-organization',
    templateUrl: './optional-column-company.component.html',
    styleUrls: ['./optional-column-company.component.scss']
})
export class OptionalColumnCompanyComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<OptionalColumnCompanyComponent>,
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
