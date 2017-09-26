import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ProgressBarService {
    private progressShow: Subject<boolean>;
    public showing$: Observable<boolean>;

    constructor() {
        this.progressShow = new Subject<boolean>();
        this.showing$ = this.progressShow.asObservable();
    }

    show() {
        this.progressShow.next(true);
    }
    hide() {
        this.progressShow.next(false);
    }
}
