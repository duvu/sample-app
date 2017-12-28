import * as _ from 'lodash';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Device } from 'app/models/device';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AppService } from 'app/services/app.service';
import { ProgressBarService } from 'app/services/progress-bar.service';
import { DeviceService } from 'app/services/device.service';
import { OptionalColumnDeviceComponent } from 'app/main/administration/device/optional-column-device/optional-column-device.component';
import { Search } from 'app/models/search';
import { AddEditDeviceComponent } from 'app/main/administration/device/add-edit-device/add-edit-device.component';
import { DeleteEvent } from 'app/models/delete-event';
import { ConfirmDeleteComponent } from 'app/main/shared/confirm-delete/confirm-delete.component';
import { merge } from 'rxjs/observable/merge';
import { catchError, map, switchMap } from 'rxjs/operators';
import { startWith } from 'rxjs/operators';
import {of as observableOf} from 'rxjs/observable/of';
@Component({
    selector: 'app-device',
    templateUrl: './device.component.html',
    styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit, AfterViewInit {
    dataSource: MatTableDataSource<Device> | null;
    dataChange: BehaviorSubject<any>;
    searchingStatement: string;


    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    displayedColumns = ['id', 'name', 'deviceId', 'accountName', 'vehicleName', 'protocol', 'createdBy', 'createdOn', 'actions'];

    columns = {
        id:                 {selected: false, order: 0},
        name:               {selected: false, order: 1},
        deviceId:           {selected: false, order: 2},
        accountId:          {selected: false, order: 3},
        accountName:        {selected: false, order: 4},
        vehicleId:          {selected: false, order: 5},
        vehicleName:        {selected: false, order: 6},
        ipAddress:          {selected: false, order: 7},
        port:               {selected: false, order: 8},
        protocol:           {selected: false, order: 9},
        serialNumber:       {selected: false, order: 10},
        modelName:          {selected: false, order: 11},
        manufacturerName:   {selected: false, order: 12},
        firmwareVersion:    {selected: false, order: 13},
        originalCountry:    {selected: false, order: 14},
        createdBy:          {selected: false, order: 15},
        createdOn:          {selected: false, order: 16},
        updatedBy:          {selected: false, order: 17},
        updatedOn:          {selected: false, order: 18},
        actions:            {selected: false, order: 19}
    };
    resultsLength = 0;

    constructor(private dialog: MatDialog,
                private app: AppService,
                private service: DeviceService,
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
                        this.sort.active, this.sort.direction, null);
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
            const displayeds = JSON.parse(localStorage.getItem('dev1-disp-cols'));
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
        const dialogRef = this.dialog.open(OptionalColumnDeviceComponent, {
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
                localStorage.setItem('dev1-disp-cols', JSON.stringify(this.displayedColumns));
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
        const data = new Device();
        data.accountId = this.app.getCurrentAccount().accountId;
        const dialogRef = this.dialog.open(AddEditDeviceComponent, {
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

    create(device: Device): void {
        this.service.create(device).subscribe(
            data => {
                this.dataChange.next(data.id);
            }
        );
    }

    openDialogEditing(data: Account): void {
        const dialogRef = this.dialog.open(AddEditDeviceComponent, {
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

    openDialogConfirmDelete(device: Device): void {
        const data = new DeleteEvent();
        data.setId(device.id);
        data.setName(device.nane);
        data.setType('Device');
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

    _delete(device: Device): void {
        this.service._delete(device.id).subscribe(
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
