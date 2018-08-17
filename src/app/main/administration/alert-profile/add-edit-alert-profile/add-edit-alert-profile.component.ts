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
import { AlertProfileRequest } from 'app/models/request/alert-profile.request';
import { ActivatedRoute } from '@angular/router';
import { AlertProfileService } from 'app/services/alert-profile.service';

@Component({
    selector: 'add-edit-alert-profile',
    templateUrl: './add-edit-alert-profile.component.html',
    styleUrls: ['./add-edit-alert-profile.component.scss']
})
export class AddEditAlertProfileComponent implements OnInit {

    isEditing: boolean = false;

    constructor(private companyService: CompanyService,
                private applicationContext: ApplicationContext,
                private activeRouter: ActivatedRoute,
                private alertProfileSerivce: AlertProfileService,
                public dialogRef: MatDialogRef<AddEditAlertProfileComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit() {
    }
    onSave() {

    }
}
