import { Component, Inject, OnInit } from '@angular/core';
import { AccountRequest } from 'app/shared/models/request/request-account';
import { AddEditAccountComponent } from 'app/main/administration/account/add-edit-account/add-edit-account.component';
import { Account } from 'app/shared/models/account';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-edit-dcs',
  templateUrl: './add-edit-dcs.component.html',
  styleUrls: ['./add-edit-dcs.component.scss']
})
export class AddEditDcsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddEditDcsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Account | any) { }

  ngOnInit() {
  }
    cancel(): void {
        this.dialogRef.close();
    }

    onSave(): void {
        this.dialogRef.close(this.data);
    }
}
