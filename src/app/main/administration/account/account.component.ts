import * as _ from 'lodash';
import {Component, OnInit, ViewChild} from '@angular/core';
import {AccountService} from '../../../services/account.service';
import {ProgressBarService} from '../../../services/progress-bar.service';
import {BaseDataSource} from '../../../services/base-data-source';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {FormControl} from '@angular/forms';
import {Account} from '../../../models/account';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {Search} from '../../../models/search';
import {AddEditAccountComponent} from 'app/main/administration/account/add-edit-account/add-edit-account.component';
import {OptionalColumnAccountComponent} from './optional-column-account/optional-column-account.component';
import {AppService} from '../../../services/app.service';
import {DeleteEvent} from '../../../models/delete-event';
import {ConfirmDeleteComponent} from '../../shared/confirm-delete/confirm-delete.component';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})

export class AccountComponent implements OnInit {
    dataSource: BaseDataSource<Account> | null;
    dataChange: BehaviorSubject<any>;
    searchingStatement: string;

    stateCtrl: FormControl;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    displayedColumns = ['id', 'accountId', 'firstName', 'lastName', 'organizationName', 'notes', 'createdBy', 'createdOn', 'actions'];

    columns = {
        id:                 {selected: false, order: 0},
        accountId:          {selected: false, order: 1},
        firstName:          {selected: false, order: 2},
        lastName:           {selected: false, order: 3},
        status:             {selected: false, order: 4},
        organizationId:     {selected: false, order: 5},
        organizationName:   {selected: false, order: 6},
        phoneNumber:        {selected: false, order: 7},
        photoUrl:           {selected: false, order: 8},
        emailAddress:       {selected: false, order: 9},
        addressLine1:       {selected: false, order: 10},
        addressLine2:       {selected: false, order: 11},
        notes:              {selected: false, order: 12},
        createdBy:          {selected: false, order: 13},
        createdOn:          {selected: false, order: 14},
        updatedBy:          {selected: false, order: 15},
        updatedOn:          {selected: false, order: 16},
        actions:            {selected: false, order: 17}
    };

    constructor(private dialog: MatDialog,
                private app: AppService,
                private service: AccountService,
                private progress: ProgressBarService) { }

    ngOnInit() {
        this.stateCtrl = new FormControl();
        this.initTableSettings();

        this.dataChange = new BehaviorSubject(0);
        this.sort.active = 'name';
        this.sort.direction = 'asc';
        this.dataSource = new BaseDataSource<Account>(
            this.service,
            this.progress,
            this.sort,
            this.paginator,
            this.dataChange);
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
        const data = new Account();
        data.organizationId = this.app.currentAccount.organizationId;
        data.organizationName = this.app.currentAccount.organizationName;
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

    create(account: Account): void {
        this.service.create(account).subscribe(
            data => {
                this.dataChange.next(data.id);
            }
        );
    }

    openDialogEditing(data: Account): void {
        const dialogRef = this.dialog.open(AddEditAccountComponent, {
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

    update(account: Account): void {

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

}
