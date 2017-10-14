import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material";
import { RoleService } from "../../../../services/role/role.service";
import { Role } from "../../../../models/Role";

@Component({
    selector: 'confirm-toggle',
    template: `
        <div *ngIf="!role.global">
            <div matDialogTitle>Confirm Disable</div>
            <div mat-dialog-content>
                <span>{{errorMessage}}</span>
                <span>You are going to disable the role #{{role.displayName}}, Confirm?</span>
            </div>
            <div mat-dialog-actions align="end">
                <button mat-button color="warn" (click)="disableRole()" [disabled]="disabling">Disable</button>
                <button mat-button (click)="cancel()">Cancel</button>
            </div>
        </div>
        <div *ngIf="role.global">
            <div matDialogTitle>Warning</div>
            <div mat-dialog-content>
                <span>Cannot disable a global role</span>
            </div>
            <div mat-dialog-actions align="end">
                <button mat-button (click)="cancel()">OK</button>
            </div>
        </div>
    `,
    styles: [``]
})
export class DisableDialog {
    role: Role;
    disabling: boolean = false;
    constructor(public dialogRef: MatDialogRef<DisableDialog>,
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
