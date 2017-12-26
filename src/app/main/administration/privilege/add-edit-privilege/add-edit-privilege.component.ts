import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-edit-privilege',
  templateUrl: './add-edit-privilege.component.html',
  styleUrls: ['./add-edit-privilege.component.scss']
})
export class AddEditPrivilegeComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddEditPrivilegeComponent>,
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
