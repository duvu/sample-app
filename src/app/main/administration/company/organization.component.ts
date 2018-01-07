import * as _ from 'lodash';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Company } from 'app/models/response/company';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AppService } from 'app/services/app.service';
import { CompanyService } from 'app/services/organization.service';
import { ProgressBarService } from 'app/services/progress-bar.service';
import { DeleteEvent } from 'app/models/response/delete-event';
import { ConfirmDeleteComponent } from 'app/main/shared/confirm-delete/confirm-delete.component';
import { OptionalColumnOrganizationComponent } from 'app/main/administration/company/optional-column-organization/optional-column-organization.component';
import { AddEditOrganizationComponent } from 'app/main/administration/company/add-edit-organization/add-edit-organization.component';
import { merge } from 'rxjs/observable/merge';
import { catchError, map, switchMap } from 'rxjs/operators';
import { startWith } from 'rxjs/operators';
import { of as observableOf } from 'rxjs/observable/of';

@Component({
    selector: 'app-organization',
    templateUrl: './organization.component.html',
    styleUrls: ['./organization.component.scss']
})
export class CompanyComponent implements OnInit, AfterViewInit {

    dataSource: MatTableDataSource<Company> | null;
    dataChange: BehaviorSubject<any>;
    resultsLength = 0;

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
                private service: CompanyService,
                private progress: ProgressBarService) { }

    ngOnInit() {
        this.initTableSettings();
        this.dataChange = new BehaviorSubject(0);
        this.dataSource = new MatTableDataSource();
    }
    ngAfterViewInit(): void {
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        merge(this.sort.sortChange, this.paginator.page, this.dataChange)
            .pipe(
                startWith({}),
                switchMap(() => {
                    this.progress.show();
                    return this.service!.searchAndSort(
                        this.paginator.pageIndex, this.paginator.pageSize,
                        this.sort.active, this.sort.direction);
                }),
                map(data => {
                    this.progress.hide();
                    this.resultsLength = data.totalElements;

                    return data.content;
                }),
                catchError(() => {
                    this.progress.hide();
                    return observableOf([]);
                })
            ).subscribe(data => this.dataSource.data = data);
    }
    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
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

    openDialogNewObject(): void {
        const data = new Company();
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

    create(organiation: Company): void {
        this.service.create(organiation).subscribe(
            data => {
                this.dataChange.next(data.id);
            }
        );
    }

    openDialogEditing(data: Company): void {
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

    update(organization: Company): void {
        this.service.update(organization.id, organization).subscribe(
            data => {},
            error => {},
            () => {
                this.dataChange.next(organization.id);
            }
        );
    }

    openDialogConfirmDelete(organization: Company): void {
        const data = new DeleteEvent();
        data.setId(organization.id);
        data.setName(organization.name);
        data.setType('Company');
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

    _delete(organization: Company): void {
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
