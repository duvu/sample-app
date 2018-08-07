import * as _ from 'lodash';
import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

import { Company } from 'app/models/company';
import { FormControl } from '@angular/forms';
import { CompanyService } from 'app/services/organization.service';
import { Privilege } from 'app/models/privilege';
import { PrivilegeService } from 'app/services/privilege.service';

import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { AccountRequest } from 'app/models/request/request-account';
import { Account } from 'app/models/account';

import { AccountService } from 'app/services/account.service';
import { ApplicationContext } from 'app/application-context';

@Component({
    selector: 'applicationContext-add-edit-account',
    templateUrl: './add-edit-account.component.html',
    styleUrls: ['./add-edit-account.component.scss']
})
export class AddEditAccountComponent implements OnInit, AfterViewInit {
    //privilegeIds: number[];
    privilege: number;
    password: string;
    re_password: string;
    companyList: Company[];

    statusList: Array<string> = [
        'UNKNOWN',
        'DELETED',
        'PENDING',
        'INACTIVATED',
        'ACTIVATED'
    ];

    filteredCompanies: Observable<Company[]>;
    filteredStatus: Observable<string[]>;

    companyControl: FormControl = new FormControl();
    statusControl: FormControl = new FormControl();

    isEditing = false;
    privilegeList: Array<Privilege> = [
        {id: 0, name: "ANONYMOUS"},
        {id: 1, name: "NORMAL_USER"},
        {id: 2, name: "MODERATOR"},
        {id: 3, name: "ADMIN"},
        {id: 4, name: "SYSADMIN"},
        {id: 5, name: "VD5LORD"}
    ];

    constructor(private companyService: CompanyService,
                public dialogRef: MatDialogRef<AddEditAccountComponent>,
                @Inject(MAT_DIALOG_DATA) public data: Account | any) { }

    ngOnInit() {
        this.isEditing = !!this.data.accountId;

        this.companyControl.setValue(this.data.company);
        this.statusControl.setValue(this.data.status);

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

        this.filteredStatus = this.statusControl.valueChanges
            .pipe(
                startWith(''),
                map(value => {
                    return this.statusList.filter(opt => opt.toLowerCase().indexOf(value.toLowerCase()) === 0);
                })
            );
    }

    ngAfterViewInit(): void {
    }

    cancel(): void {
        this.dialogRef.close();
    }

    onSave(): void {
        let data1 = new AccountRequest(this.data);
        data1.companyId = this.companyControl.value.id;
        data1.companyName = this.companyControl.value.name;
        data1.status = this.statusControl.value;

        data1.password = this.password;
        this.dialogRef.close(data1);
    }

    filter(value: string): Company[] {
        if(_.isString(value)) {
            return this.companyList.filter(co => co.name.toLowerCase().indexOf(value.toLowerCase()) === 0)
        } else {
            return this.companyList;
        }
    }


    displayFn(company: Company): string | undefined {
        return company ? company.name : undefined;
    }
}
