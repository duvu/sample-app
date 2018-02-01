import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Dcs } from 'app/shared/models/dcs';

@Component({
  selector: 'app-add-edit-dcs',
  templateUrl: './add-edit-dcs.component.html',
  styleUrls: ['./add-edit-dcs.component.scss']
})
export class AddEditDcsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddEditDcsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Dcs | any) { }

  ngOnInit() {
  }
    cancel(): void {
        this.dialogRef.close();
    }

    onSave(): void {
        this.dialogRef.close(this.data);
    }
}
