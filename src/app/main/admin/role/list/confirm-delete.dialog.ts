import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {Role} from "../../../../models/Role";
import {RoleService} from "../../../../services/role/role.service";

@Component({
    selector: 'confirm-delete',
    template: `
        <div *ngIf="!role.global">
            <div matDialogTitle>Confirm Delete</div>
            <div mat-dialog-content>
                <span>{{errorMessage}}</span>
                <span>You are going to delete the role #{{role.displayName}}, Confirm?</span>
            </div>
            <div mat-dialog-actions align="end">
                <button mat-button color="warn" (click)="deleteRole()">Delete</button>
                <button mat-button (click)="cancel()">Cancel</button>
            </div>
        </div>
        <div *ngIf="role.global">
            <div matDialogTitle>Warning</div>
            <div mat-dialog-content>
                <span>Cannot delete a global role</span>
            </div>
            <div mat-dialog-actions align="end">
                <button mat-button (click)="cancel()">Cancel</button>
            </div>
        </div>
    `,
    styles: [``]
})
export class ConfirmDeleteDialog {
    role: Role;
    isError: boolean = false;
    errorMessage: string;
    constructor(public dialogRef: MatDialogRef<ConfirmDeleteDialog>,
                private roleService: RoleService) { }

    deleteRole() {
        this.roleService._delete(this.role.roleID).subscribe(
            data => {
                this.isError = false;
                this.errorMessage = "";
                this.dialogRef.close(data);
            },
            err => {
                this.isError = true;
                this.errorMessage = err.message;
            },
            () => {}
        );
    }
    cancel() {
        this.dialogRef.close(false);
    }
}
