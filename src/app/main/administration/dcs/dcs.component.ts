import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DcsService } from 'app/shared/services/dcs.service';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Dcs } from 'app/shared/models/dcs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';
import { ProgressBarService } from 'app/shared/services/progress-bar.service';
import { AddEditDcsComponent } from 'app/main/administration/dcs/add-edit-dcs/add-edit-dcs.component';
import { DcsRequest } from 'app/shared/models/request/dcs-request';

@Component({
    selector: 'app-dcs',
    templateUrl: './dcs.component.html',
    styleUrls: ['./dcs.component.scss']
})
export class DcsComponent implements OnInit, AfterViewInit {
    dataSource: MatTableDataSource<Dcs>;
    dataChange: ReplaySubject<any>;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    displayedColumns = ['toggle', 'id', 'name', 'duplex', 'address', 'port', 'className', 'actions'];

    resultsLength = 0;

    constructor(private service: DcsService,
                private dialog: MatDialog,
                private progress: ProgressBarService) { }

    ngOnInit() {
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

    toggleStatus(dcs: Dcs): void {

    }

    openDialogNewObject(): void {
        const data = new Dcs();
        const dialogRef = this.dialog.open(AddEditDcsComponent, {
            disableClose: true,
            data: data
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.create(result);
            }
        });
    }

    openDialogEditing(dcs: Dcs): void {
        const dialogRef = this.dialog.open(AddEditDcsComponent, {
            disableClose: true,
            data: dcs
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.update(result);
            }
        });
    }

    openDialogConfirmDelete(dcs: Dcs): void {

    }

    create(dcs: Dcs) {

    }

    update(dcs: Dcs) {

    }
}
