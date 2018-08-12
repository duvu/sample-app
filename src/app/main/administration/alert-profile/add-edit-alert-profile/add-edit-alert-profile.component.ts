import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Company } from 'app/models/company';
import * as _ from 'lodash';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { CompanyService } from 'app/services/organization.service';
import { ApplicationContext } from 'app/application-context';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'add-edit-alert-profile',
    templateUrl: './add-edit-alert-profile.component.html',
    styleUrls: ['./add-edit-alert-profile.component.scss']
})
export class AddEditAlertProfileComponent implements OnInit {

    isEditing: boolean = false;
    companyList: Company[];
    filteredCompanies: Observable<Company[]>;

    companyControl: FormControl = new FormControl();
    constructor(private companyService: CompanyService,
                private applicationContext: ApplicationContext,
                public dialogRef: MatDialogRef<AddEditAlertProfileComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit() {
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

    save(): void {

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
