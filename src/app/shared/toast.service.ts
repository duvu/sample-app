import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MatSnackBarConfig } from '@angular/material/snack-bar/typings/snack-bar-config';
import { SimpleSnackBar } from '@angular/material/snack-bar/typings/simple-snack-bar';
import { MatSnackBarRef } from '@angular/material/snack-bar/typings/snack-bar-ref';

@Injectable()
export class ToastService {
    constructor(private snackBar: MatSnackBar) {}

    info(message: string): void {
        this.snackBar.open(message, null, {
            duration: 2000,
            horizontalPosition: 'right'
        });
    }

    error(message: string): void {
        this.snackBar.open(message, null, {
            duration: 2000,
            horizontalPosition: 'right'
        });
    }

    open(message: string, action?: string, config?: MatSnackBarConfig) {

    }
}