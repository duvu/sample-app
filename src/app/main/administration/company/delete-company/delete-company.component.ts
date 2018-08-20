import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Company } from 'app/models/company';

@Component({
  selector: 'app-delete-company',
  templateUrl: './delete-company.component.html',
  styleUrls: ['./delete-company.component.scss']
})
export class DeleteCompanyComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteCompanyComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Company | any) { }

  ngOnInit() {
  }

}
