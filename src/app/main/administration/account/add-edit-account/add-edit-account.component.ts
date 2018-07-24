import * as _ from 'lodash';
import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

import { Company } from 'app/shared/models/company';
import { FormControl } from '@angular/forms';
import { CompanyService } from 'app/shared/services/organization.service';
import { Privilege } from 'app/shared/models/privilege';
import { PrivilegeService } from 'app/shared/services/privilege.service';

import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { pipe } from 'rxjs/Rx';
import { AccountRequest } from 'app/shared/models/request/request-account';
import { Account } from 'app/shared/models/account';
import { PrivilegeLittle } from 'app/shared/models/little/privilege-little';
import { CompanyLittle } from 'app/shared/models/little/company-little';
import { AccountService } from 'app/shared/services/account.service';
import { ApplicationContext } from 'app/application-context';

@Component({
    selector: 'app-add-edit-account',
    templateUrl: './add-edit-account.component.html',
    styleUrls: ['./add-edit-account.component.scss']
})
export class AddEditAccountComponent implements OnInit, AfterViewInit {
    privilegeIds: number[];
    password: string;
    re_password: string;
    companyList: Company[];
    statusList: string[];

    filteredCompanies: Observable<Company[]>;
    filteredStatus: Observable<string[]>;

    companyControl: FormControl = new FormControl();
    statusControl: FormControl = new FormControl();

    isEditing = false;
    isCurrentLoggedInAccount = false;
    privilegeList: Observable<Privilege[]>;

    constructor(private companyService: CompanyService,
                private accountService: AccountService,
                private app: ApplicationContext,
                private privilegeService: PrivilegeService,
                public dialogRef: MatDialogRef<AddEditAccountComponent>,
                @Inject(MAT_DIALOG_DATA) public data: Account | any) { }

    ngOnInit() {
        this.privilegeIds = _.map(this.data.privileges, (privilege: PrivilegeLittle) => {
            return privilege.id;
        });

        this.isEditing = !!this.data.accountId;
        this.isCurrentLoggedInAccount = (this.data.id === this.app.getCurrentAccount().accountId);

        this.privilegeList = this.privilegeService.getAll();
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

        this.accountService.getAllStatus().subscribe(
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
    }

    ngAfterViewInit(): void {
    }

    cancel(): void {
        this.dialogRef.close();
    }

    onSave(): void {
        let data1 = new AccountRequest(this.data);
        data1.privilegeIds = this.privilegeIds;
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


    displayFn(company: Company): string | Company {
        return company ? company.name : company;
    }
}
