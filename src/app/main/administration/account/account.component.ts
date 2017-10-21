import * as _ from 'lodash';
import {Component, OnInit, ViewChild} from '@angular/core';
import {AccountService} from "../../../services/account.service";
import {ProgressBarService} from "../../../services/progress-bar.service";
import {BaseDataSource} from "../../../services/BaseDataSource";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {FormControl} from "@angular/forms";
import {Account} from "../../../models/Account";
import {MatDialog, MatPaginator, MatSort} from "@angular/material";
import {Search} from "../../../models/Search";
import {AddEditAccountComponent} from "app/main/administration/account/add-edit-account/add-edit-account.component";
import {OptionalColumnAccountComponent} from "./optional-column-account/optional-column-account.component";

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

    constructor(private dialog: MatDialog,
                private service: AccountService,
                private progress: ProgressBarService) { }

    dataSource: BaseDataSource<Account> | null;
    dataChange: BehaviorSubject<any>;
    searchingStatement: string;

    stateCtrl: FormControl;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    displayedColumns = ['id', 'accountId', 'firstName', 'lastName', 'organizationName', 'notes', 'createdBy', 'createdOn', 'actions'];


    columns = {
        id: {selected: true, order: 0},
        accountId: {selected: false, order: 1},
        firstName: {selected: false, order: 2},
        lastName: {selected: false, order: 4},
        status: {selected: false, order: 5},
        organizationId: {selected: false, order: 6},
        organizationName: {selected: false, order: 7},
        phoneNumber: {selected: false, order: 8},
        photoUrl: {selected: false, order: 9},
        emailAddress: {selected: false, order: 9},
        addressLine1: {selected: false, order: 9},
        addressLine2: {selected: false, order: 9},
        notes: {selected: false, order: 9},
        createdBy: {selected: false, order: 9},
        createdOn: {selected: false, order: 9},
        updatedBy: {selected: false, order: 9},
        updatedOn: {selected: false, order: 9}
    };

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
            const displayeds = JSON.parse(localStorage.getItem('account-displayed-columns'));
            if (displayeds != null) {
                this.displayedColumns = displayeds;
            }
        } catch (e) {
            console.log(e);
        }

        // 2. generate new columns
        _.forEach(Object.keys(this.columns), (column) => {
            console.log(column);
            if (this.displayedColumns.includes(column)) {
                this.columns[column].selected = true;
            }
        });
        console.log(this.columns);
    }

    openDialogColumnOptions(): void {
        const dialogRef = this.dialog.open(OptionalColumnAccountComponent, {
            data: this.columns
        });
        dialogRef.afterClosed().subscribe(
            // result => {
            //     if (result) {
            //         this.displayedColumns = _.reduce(this.columns, (refined, column) => {
            //             if (column.selected) {
            //                 refined.push(column.name);
            //             }
            //             return refined;
            //         }, []);
            //     }
            //     localStorage.setItem('cocs-displayed-columns', JSON.stringify(this.displayedColumns));
            // }
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
        const account = new Account();
        const dialogRef = this.dialog.open(AddEditAccountComponent, {
            //width: '600px',
            disableClose: true,
            data: account
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('data', result);
            if (result) {
                this.createObject(result);
            }
        });
    }

    createObject(account: Account): void {
        this.service.create(account).subscribe(
            data => {
                this.dataChange.next(data.id);
            }
        );
    }

}
