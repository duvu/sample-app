import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddEditAlertProfileComponent } from 'app/main/administration/alert-profile/add-edit-alert-profile/add-edit-alert-profile.component';

@Component({
    selector: 'app-alert-profile',
    templateUrl: './alert-profile.component.html',
    styleUrls: ['./alert-profile.component.scss']
})
export class AlertProfileComponent implements OnInit {

    constructor(public dialog: MatDialog) { }

    ngOnInit() {
    }

    openDialogColumnOptions(): void {

    }

    dialogToCreateNewAlertProfile(): void {
        const dialogRef = this.dialog.open(AddEditAlertProfileComponent, {
            width: 800,
            data: { id: '' }
        });
        dialogRef.afterClosed().subscribe(result => {});
    }

    applyFilter(value: string) {

    }
}
