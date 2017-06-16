import { Component } from '@angular/core';
import { MdDialogRef } from "@angular/material";
import { RoleService } from "../../../services/role/role.service";
import { Role } from "../../../models/Role";

@Component({
    selector: 'confirm-toggle',
    template: `
        <div *ngIf="!role.global">
            <div md-dialog-title>Confirm Disable</div>
            <div md-dialog-content>
                <span>{{errorMessage}}</span>
                <span>You are going to disable the role #{{role.displayName}}, Confirm?</span>
            </div>
            <div md-dialog-actions align="end">
                <button md-button color="warn" (click)="disableRole()" [disabled]="disabling">Disable</button>
                <button md-button (click)="cancel()">Cancel</button>
            </div>
        </div>
        <div *ngIf="role.global">
            <div md-dialog-title>Warning</div>
            <div md-dialog-content>
                <span>Cannot disable a global role</span>
            </div>
            <div md-dialog-actions align="end">
                <button md-button (click)="cancel()">OK</button>
            </div>
        </div>
    `,
    styles: [``]
})
export class DisableDialog {
    role: Role;
    disabling: boolean = false;
    constructor(public dialogRef: MdDialogRef<DisableDialog>,
                private roleService: RoleService) { }

    disableRole() {
        this.disabling = true;
        this.roleService.toggle(this.role.roleID).subscribe(
            result => {
                //this.role.isActive = true;
                this.dialogRef.close(true);
            },
            error => {
                console.log('Error', error);
                this.dialogRef.close(false);
            },
            () => {
                //finished
            }
        );
    }
    cancel() {
        this.dialogRef.close(false);
    }
}
