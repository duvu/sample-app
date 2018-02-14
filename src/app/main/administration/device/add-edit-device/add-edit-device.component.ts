import * as _ from 'lodash';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Company } from 'app/shared/models/company';
import { Account } from 'app/shared/models/account';
import { CompanyService } from 'app/shared/services/organization.service';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { PrivilegeLittle } from 'app/shared/models/little/privilege-little';
import { AccountLittle } from 'app/shared/models/little/account-little';
import { AccountService } from 'app/shared/services/account.service';
import { AccountRequest } from 'app/shared/models/request/request-account';
import { RequestDevice } from 'app/shared/models/request/request-device';

@Component({
  selector: 'app-add-edit-device',
  templateUrl: './add-edit-device.component.html',
  styleUrls: ['./add-edit-device.component.scss']
})
export class AddEditDeviceComponent implements OnInit {

    filteredCompanies: Observable<Company[]>;
    companyControl: FormControl = new FormControl();
    companyList: Company[];

    accountList: Observable<Account[]>;
    accountIds: number[];
    constructor(private companyService: CompanyService, private accountService: AccountService,
        public dialogRef: MatDialogRef<AddEditDeviceComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        this.accountIds = _.map(this.data.accounts, (acc: AccountLittle) => {
            return acc.id;
        });

        this.accountList = this.accountService.getAll();

        this.companyService.getAll().subscribe(
            response => {
                this.companyList = response;
            },
            error => {},
            () => {
                this.filteredCompanies = this.companyControl.valueChanges
                    .pipe(
                        startWith(''),
                        map(value => this.filter(value))
                    );
            }
        );
    }

    filter(value: string): Company[] {
        if(_.isString(value)) {
            return this.companyList.filter(co => co.name.toLowerCase().indexOf(value.toLowerCase()) === 0)
        } else {
            return this.companyList;
        }
    }


    displayFn(company: Company): string | Company {
        return company ? company.name : company;
    }

    cancel(): void {
        this.dialogRef.close();
    }

    onSave(): void {
        console.log('Data#d', this.data);

        let data1 = new RequestDevice(this.data);
        data1.accountIds = this.accountIds;
        this.dialogRef.close(data1);
    }

}
