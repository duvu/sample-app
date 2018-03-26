import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-add-edit-geozone',
    templateUrl: './add-edit-geozone.component.html',
    styleUrls: ['./add-edit-geozone.component.scss']
})
export class AddEditGeozoneComponent implements OnInit {
    type: string;
    layer: any;
    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                private dialogRef: MatDialogRef<AddEditGeozoneComponent>,) { }

    ngOnInit() {
        console.log(this.data);
        this.type = this.data.layerType;
        this.layer = this.data.layer.toGeoJSON();
        console.log(this.layer)
    }
    cancel(): void {
        this.dialogRef.close();
    }

}
