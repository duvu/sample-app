import * as _ from 'lodash';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Privilege } from 'app/models/response/privilege';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AppService } from 'app/services/app.service';
import { PrivilegeService } from 'app/services/privilege.service';
import { ProgressBarService } from 'app/services/progress-bar.service';
import { DeleteEvent } from 'app/models/response/delete-event';
import { ConfirmDeleteComponent } from 'app/main/shared/confirm-delete/confirm-delete.component';
import { OptionalColumnPrivilegeComponent } from 'app/main/administration/privilege/optional-column-privilege/optional-column-privilege.component';
import { AddEditPrivilegeComponent } from 'app/main/administration/privilege/add-edit-privilege/add-edit-privilege.component';
import { merge } from 'rxjs/observable/merge';
import { catchError, map, switchMap } from 'rxjs/operators';
import { startWith } from 'rxjs/operators';
import {of as observableOf} from 'rxjs/observable/of';

@Component({
  selector: 'app-privilege',
  templateUrl: './privilege.component.html',
  styleUrls: ['./privilege.component.scss']
})
export class PrivilegeComponent implements OnInit, AfterViewInit {

    dataSource: MatTableDataSource<Privilege> | null;
    dataChange: BehaviorSubject<any>;
    searchingStatement: string;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    displayedColumns = ['id', 'name', 'description','createdBy', 'createdOn', 'actions'];

    columns = {
        id:                 {selected: false, order: 0},
        name:               {selected: false, order: 1},
        description:        {selected: false, order: 7},
        createdBy:          {selected: false, order: 13},
        createdOn:          {selected: false, order: 14},
        updatedBy:          {selected: false, order: 15},
        updatedOn:          {selected: false, order: 16},
        actions:            {selected: false, order: 17}
    };

    resultsLength = 0;

    constructor(private dialog: MatDialog,
                private app: AppService,
                private service: PrivilegeService,
                private progress: ProgressBarService) { }

    ngOnInit() {
        this.initTableSettings();
        this.dataChange = new BehaviorSubject(0);
        this.dataSource = new MatTableDataSource();

        // this.dataChange = new BehaviorSubject(0);
        // this.sort.active = 'name';
        // this.sort.direction = 'asc';
        // this.dataSource = new BaseDataSource<Privilege>(
        //     this.service,
        //     this.progress,
        //     this.sort,
        //     this.paginator,
        //     this.dataChange);
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
            const displayeds = JSON.parse(localStorage.getItem('pri-disp-cols'));
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
        const dialogRef = this.dialog.open(OptionalColumnPrivilegeComponent, {
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
                localStorage.setItem('pri-disp-cols', JSON.stringify(this.displayedColumns));
            }
        );
    }

    openDialogNewObject(): void {
        const data = new Privilege();
        const dialogRef = this.dialog.open(AddEditPrivilegeComponent, {
            disableClose: true,
            data: data
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.create(result);
            }
        });
    }

    create(privilege: Privilege): void {
        this.service.create(privilege).subscribe(
            data => {
                this.dataChange.next(data.id);
            }
        );
    }

    openDialogEditing(data: Privilege): void {
        const dialogRef = this.dialog.open(AddEditPrivilegeComponent, {
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

    update(privilege: Privilege): void {
        this.service.update(privilege.id, privilege).subscribe(
            data => {},
            error => {},
            () => {
                this.dataChange.next(privilege.id);
            }
        );
    }

    openDialogConfirmDelete(privilege: Privilege): void {
        const data = new DeleteEvent();
        data.setId(privilege.id);
        data.setName(privilege.name);
        data.setType('Privilege');
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

    _delete(privilege: Privilege): void {
        this.service._delete(privilege.id).subscribe(
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
