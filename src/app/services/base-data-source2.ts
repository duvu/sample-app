import { OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

export class BaseDataSource2<T> extends MatTableDataSource<T> implements OnInit {

    ngOnInit(): void {
    }

}