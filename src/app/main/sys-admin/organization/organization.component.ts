import * as _ from 'lodash';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseDataSource } from 'app/services/base-data-source';
import { Organization } from 'app/models/organization';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FormControl } from '@angular/forms';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { AppService } from 'app/services/app.service';
import { OrganizationService } from 'app/services/organization.service';
import { ProgressBarService } from 'app/services/progress-bar.service';
import { OptionalColumnOrganizationComponent } from 'app/main/sys-admin/organization/optional-column-organization/optional-column-organization.component';
import { Search } from 'app/models/search';
import { AddEditOrganizationComponent } from 'app/main/sys-admin/organization/add-edit-organization/add-edit-organization.component';
import { DeleteEvent } from 'app/models/delete-event';
import { ConfirmDeleteComponent } from 'app/main/shared/confirm-delete/confirm-delete.component';

@Component({
    selector: 'app-organization',
    templateUrl: './organization.component.html',
    styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {

    dataSource: BaseDataSource<Organization> | null;
    dataChange: BehaviorSubject<any>;
    searchingStatement: string;

    stateCtrl: FormControl;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    displayedColumns = ['id', 'name', 'emailAddress', 'phoneNumber', 'addressLine1', 'addressLine2', 'createdBy', 'createdOn', 'actions'];

    columns = {
        id:                 {selected: false, order: 0},
        name:          {selected: false, order: 1},
        phoneNumber:        {selected: false, order: 7},
        photoUrl:           {selected: false, order: 8},
        emailAddress:       {selected: false, order: 9},
        addressLine1:       {selected: false, order: 10},
        addressLine2:       {selected: false, order: 11},
        createdBy:          {selected: false, order: 13},
        createdOn:          {selected: false, order: 14},
        updatedBy:          {selected: false, order: 15},
        updatedOn:          {selected: false, order: 16},
        actions:            {selected: false, order: 17}
    };

    constructor(private dialog: MatDialog,
                private app: AppService,
                private service: OrganizationService,
                private progress: ProgressBarService) { }

    ngOnInit() {
        this.stateCtrl = new FormControl();
        this.initTableSettings();

        this.dataChange = new BehaviorSubject(0);
        this.sort.active = 'name';
        this.sort.direction = 'asc';
        this.dataSource = new BaseDataSource<Organization>(
            this.service,
            this.progress,
            this.sort,
            this.paginator,
            this.dataChange);
    }
    initTableSettings(): void {
        try {
            const displayeds = JSON.parse(localStorage.getItem('org-disp-cols'));
            if (displayeds != null) {
                this.displayedColumns = displayeds;
            }
        } catch (e) {
            console.log(e);
        }

        // 2. generate new columns
        _.forOwn(this.columns, (value, key) => {
            if (this.displayedColumns.includes(key)) {
                value.selected = true;
            }
        });
    }

    openDialogColumnOptions(): void {
        const dialogRef = this.dialog.open(OptionalColumnOrganizationComponent, {
            data: this.columns
        });
        dialogRef.afterClosed().subscribe(
            result => {
                if (result) {
                    this.displayedColumns = [];
                    _.forOwn(this.columns, (value, key) => {
                        if (value.selected) {
                            this.displayedColumns.push(key);
                        }
                    });
                }
                localStorage.setItem('org-disp-cols', JSON.stringify(this.displayedColumns));
            }
        );
    }

    search(): void {
        const searchs = [];
        if (this.searchingStatement) {
            const search = new Search();
            search.column = 'name';
            search.content = this.searchingStatement;
            searchs.push(search);
        }
        this.dataChange.next({search: searchs});
    }

    openDialogNewObject(): void {
        const data = new Organization();
        const dialogRef = this.dialog.open(AddEditOrganizationComponent, {
            disableClose: true,
            data: data
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.create(result);
            }
        });
    }

    create(organiation: Organization): void {
        this.service.create(organiation).subscribe(
            data => {
                this.dataChange.next(data.id);
            }
        );
    }

    openDialogEditing(data: Organization): void {
        const dialogRef = this.dialog.open(AddEditOrganizationComponent, {
            // width: '600px',
            disableClose: true,
            data: data
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.update(result);
            }
        });
    }

    update(organization: Organization): void {
        this.service.update(organization.id, organization).subscribe(
            data => {},
            error => {},
            () => {
                this.dataChange.next(organization.id);
            }
        );
    }

    openDialogConfirmDelete(organization: Organization): void {
        const data = new DeleteEvent();
        data.setId(organization.id);
        data.setName(organization.name);
        data.setType('Organization');
        const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
            disableClose: true,
            data: data
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._delete(result);
            }
        });
    }

    _delete(organization: Organization): void {
        this.service._delete(organization.id).subscribe(
            data => {
                this.dataChange.next(0);
            },
            error => {
                this.dataChange.next(error);
            },
            () => {
                this.dataChange.next(1);
            }
        );
    }
}
