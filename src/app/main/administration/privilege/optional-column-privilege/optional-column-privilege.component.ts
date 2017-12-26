import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-optional-column-privilege',
    templateUrl: './optional-column-privilege.component.html',
    styleUrls: ['./optional-column-privilege.component.scss']
})
export class OptionalColumnPrivilegeComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<OptionalColumnPrivilegeComponent>,
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
