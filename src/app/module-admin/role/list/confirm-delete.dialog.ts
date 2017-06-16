import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from "@angular/material";
import {Role} from "../../../models/Role";
import {RoleService} from "../../../services/role/role.service";

@Component({
    selector: 'confirm-delete',
    template: `
        <div *ngIf="!role.global">
            <div md-dialog-title>Confirm Delete</div>
            <div md-dialog-content>
                <span>{{errorMessage}}</span>
                <span>You are going to delete the role #{{role.displayName}}, Confirm?</span>
            </div>
            <div md-dialog-actions align="end">
                <button md-button color="warn" (click)="deleteRole()">Delete</button>
                <button md-button (click)="cancel()">Cancel</button>
            </div>
        </div>
        <div *ngIf="role.global">
            <div md-dialog-title>Warning</div>
            <div md-dialog-content>
                <span>Cannot delete a global role</span>
            </div>
            <div md-dialog-actions align="end">
                <button md-button (click)="cancel()">Cancel</button>
            </div>
        </div>
    `,
    styles: [``]
})
export class ConfirmDeleteDialog {
    role: Role;
    isError: boolean = false;
    errorMessage: string;
    constructor(public dialogRef: MdDialogRef<ConfirmDeleteDialog>,
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
