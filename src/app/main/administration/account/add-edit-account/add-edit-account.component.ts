import * as _ from 'lodash';
import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

import { Company } from 'app/shared/models/company';
import { FormControl } from '@angular/forms';
import { CompanyService } from 'app/services/organization.service';
import { Privilege } from 'app/shared/models/privilege';
import { PrivilegeService } from 'app/services/privilege.service';

import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { pipe } from 'rxjs/Rx';
import { AccountRequest } from 'app/shared/models/request/request-account';

@Component({
    selector: 'app-add-edit-account',
    templateUrl: './add-edit-account.component.html',
    styleUrls: ['./add-edit-account.component.scss']
})
export class AddEditAccountComponent implements OnInit {

    data1: AccountRequest;
    company: Company;
    filteredCompanies: Observable<Company[]>;
    companyControl: FormControl = new FormControl();
    companyList: Company[];

    isEditing = false;
    privilegeList: Observable<Privilege[]>;

    constructor(private companyService: CompanyService,
                private privilegeService: PrivilegeService,
                public dialogRef: MatDialogRef<AddEditAccountComponent>,
                @Inject(MAT_DIALOG_DATA) public data: Account | any) { }

    ngOnInit() {
        this.data1 = new AccountRequest(this.data);
        this.company = this.data.company;

        this.isEditing = this.data.accountId ? true : false;
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
    }
    cancel(): void {
        this.dialogRef.close();
    }

    onSave(): void {
        this.data1.companyId = this.company.id;
        this.dialogRef.close(this.data1);
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
