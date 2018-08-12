import * as _ from 'lodash';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Company } from 'app/models/company';
import { Account } from 'app/models/account';
import { CompanyService } from 'app/services/organization.service';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { AccountLittle } from 'app/models/little/account.little';
import { AccountService } from 'app/services/account.service';
import { AccountRequest } from 'app/models/request/account.request';
import { DeviceRequest } from 'app/models/request/device.request';
import { DeviceService } from 'app/services/device.service';

@Component({
  selector: 'app-add-edit-device',
  templateUrl: './add-edit-device.component.html',
  styleUrls: ['./add-edit-device.component.scss']
})
export class AddEditDeviceComponent implements OnInit {

    filteredCompanies: Observable<Company[]>;
    companyControl: FormControl = new FormControl();
    companyList: Company[];

    statusList: string[];
    filteredStatus: Observable<string[]>;
    statusControl: FormControl = new FormControl();

    dateExpired: Date;

    accountList: Observable<Account[]>;
    accountIds: number[];
    constructor(private companyService: CompanyService,
                private accountService: AccountService,
                private deviceService: DeviceService,
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

        this.deviceService.getAllStatus().subscribe(
            response => {
                this.statusList = response;
            },
            error => {},
            () => {
                this.filteredStatus = this.statusControl.valueChanges
                    .pipe(
                        startWith(''),
                        map(value => {
                            return this.statusList.filter(opt => opt.toLowerCase().indexOf(value.toLowerCase()) === 0);
                        })
                    );
            }
        );

        this.dateExpired = this.data.expiredOn ? new Date(this.data.expiredOn) : null;
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
        this.data.expiredOn = this.dateExpired;
        let data1 = new DeviceRequest(this.data);
        data1.accountIds = this.accountIds;
        this.dialogRef.close(data1);
    }

}
