import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BaseService} from './base.service';
import {MatPaginator, MatSort} from '@angular/material';
import {ProgressBarService} from './progress-bar.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';

export class BaseDataSource<T> extends DataSource<T> {
    private _service: BaseService<T>;
    private _sort: MatSort;
    private _paginator: MatPaginator;
    private _progress: ProgressBarService;
    private _dataChange: BehaviorSubject<any>;

    public length;

    constructor(service: BaseService<T>,
                progress: ProgressBarService,
                sort: MatSort,
                paginator: MatPaginator,
                dataChange: BehaviorSubject<any>) {
        super();
        this._service = service;
        this._progress = progress;
        this._dataChange = dataChange;
        this._sort = sort;
        this._paginator = paginator;
    }

    connect(collectionViewer: CollectionViewer): Observable<T[]> {
        const displayDataChanges = [
            this._sort.sortChange,
            this._paginator.page,
            this._dataChange
        ];
        return Observable.merge(... displayDataChanges)
            .startWith(null)
            .switchMap(() => {
                this._progress.show();
                return this._service.searchAndSort(
                    this._paginator.pageIndex,
                    this._paginator.pageSize,
                    this._sort.active,
                    this._sort.direction,
                    this._dataChange.getValue().search);
            }).map(dataObject => {
                this._progress.hide();
                this.length = dataObject.totalElements;
                return dataObject.content;
            }).catch(error => {
                this._progress.hide();
                return Observable.of([]);
            });
    }

    disconnect(collectionViewer: CollectionViewer): void {
    }
}
