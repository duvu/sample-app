import * as _ from 'lodash';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {AccountService} from 'app/shared/services/account.service';
import {ProgressBarService} from 'app/shared/services/progress-bar.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Account} from 'app/shared/models/account';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import {AddEditAccountComponent} from 'app/main/administration/account/add-edit-account/add-edit-account.component';
import {OptionalColumnAccountComponent} from './optional-column-account/optional-column-account.component';
import {AppService} from 'app/shared/services/app.service';
import {DeleteEvent} from 'app/shared/models/delete-event';
import {ConfirmDeleteComponent} from 'app/shared/components/confirm-delete/confirm-delete.component';
import { merge } from 'rxjs/observable/merge';
import { catchError, map, switchMap } from 'rxjs/operators';
import { startWith } from 'rxjs/operators';
import {of as observableOf} from 'rxjs/observable/of';
import { AccountRequest } from 'app/shared/models/request/request-account';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { CompanyLittle } from 'app/shared/models/little/company-little';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})

export class AccountComponent implements OnInit, AfterViewInit {
    dataSource: MatTableDataSource<Account>;
    dataChange: ReplaySubject<any>;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    displayedColumns = ['id', 'accountId', 'firstName', 'lastName', 'companyName', 'notes', 'createdBy', 'createdOn', 'actions'];

    columns = {
        id:                 {selected: false, order: 0},
        accountId:          {selected: false, order: 1},
        firstName:          {selected: false, order: 2},
        lastName:           {selected: false, order: 3},
        status:             {selected: false, order: 4},
        companyId:     {selected: false, order: 5},
        companyName:   {selected: false, order: 6},
        phoneNumber:        {selected: false, order: 7},
        photoUrl:           {selected: false, order: 8},
        emailAddress:       {selected: false, order: 9},
        addressLine1:       {selected: false, order: 10},
        addressLine2:       {selected: false, order: 11},
        notes:              {selected: false, order: 12},
        roles:              {selected: false, order: 13},
        createdBy:          {selected: false, order: 13},
        createdOn:          {selected: false, order: 14},
        updatedBy:          {selected: false, order: 15},
        updatedOn:          {selected: false, order: 16},
        actions:            {selected: false, order: 17}
    };

    resultsLength = 0;

    constructor(private dialog: MatDialog,
                private app: AppService,
                private service: AccountService,
                private progress: ProgressBarService) { }

    ngOnInit() {
        this.initTableSettings();
        this.dataChange = new ReplaySubject(1);
        this.dataSource = new MatTableDataSource();
    }

    ngAfterViewInit(): void {
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        this.dataSource.sort = this.sort;
        //this.dataSource.paginator = this.paginator;

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
            const displayeds = JSON.parse(localStorage.getItem('acc-disp-cols'));
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
        const dialogRef = this.dialog.open(OptionalColumnAccountComponent, {
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
                localStorage.setItem('acc-disp-cols', JSON.stringify(this.displayedColumns));
            }
        );
    }

    openDialogNewObject(): void {
        const data = new Account();
        data.company = {};
        const dialogRef = this.dialog.open(AddEditAccountComponent, {
            // width: '600px',
            disableClose: true,
            data: data
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.create(result);
            }
        });
    }

    create(account: AccountRequest): void {
        this.progress.show();
        this.service.create(account).subscribe(
            data => {
                this.dataChange.next(data.id);
            },
            error => {
                this.progress.hide();
            },
            () => {
                this.progress.hide();
            }
        );
    }

    openDialogEditing(data: Account): void {
        if (!data.company) {
            data.company = new CompanyLittle();
        }
        const dialogRef = this.dialog.open(AddEditAccountComponent, {
            disableClose: true,
            data: data
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.update(data.id, result);
            }
        });
    }

    update(id: number, account: AccountRequest): void {
        console.log('Updating Account Record.....!', account);
        this.service.update(id, account).subscribe(
            result => {
                console.log('-', result);
            }
        );
    }

    openDialogConfirmDelete(account: Account): void {
        const data = new DeleteEvent();
        data.setId(account.id);
        data.setName(account.accountId);
        data.setType('Account');
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

    _delete(account: Account): void {
        this.service._delete(account.id).subscribe(
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

    // openDialogRoleUpdate(data: Account): void {
    //     const dialogRef = this.dialog.open(RoleUpdateComponent, {
    //         width: '500px',
    //         disableClose: true,
    //         data: data
    //     });
    //
    //     dialogRef.afterClosed().subscribe(result => {
    //         if (result) {
    //             this.update(result);
    //         }
    //     });
    // }


}
