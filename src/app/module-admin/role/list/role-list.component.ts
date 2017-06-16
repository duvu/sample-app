import { Component, OnInit } from '@angular/core';
import {Role} from "../../../models/Role";
import {RoleService} from "../../../services/role/role.service";
import {MdDialog, MdDialogConfig, MdSnackBar} from "@angular/material";
import {ConfirmDeleteDialog} from "./confirm-delete.dialog";
import {DisableDialog} from "./confirm-disable.dialog";


@Component({
    selector: 'app-role-list',
    templateUrl: './role-list.component.html',
    styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {
    errorMessage: string;
    roleList: Role[];

    config: MdDialogConfig = {
        disableClose: false,
        width: '',
        height: '',
        position: {
            top: '',
            bottom: '',
            left: '',
            right: ''
        },
        data: {
            message: 'Jazzy jazz jazz'
        }
    };
    constructor(private roleService: RoleService, public snackBar: MdSnackBar,
                private dialog: MdDialog) { }

    ngOnInit() {
        this.getRolesList();
    }

    getRolesList() {
        this.roleService.getAll().subscribe(
            data => {
                this.roleList = data
            },
            err => console.log("#Error", err),
            () => {}
        );
    }
    toggleStatusRole(role: Role) {
        if (!role.isActive) {
            // role.isActive = false;
            let dialogRef = this.dialog.open(DisableDialog, this.config);
            dialogRef.componentInstance.role=role;
            dialogRef.afterClosed().subscribe(
                result => {
                    role.isActive = !result;
                }
            );
        } else {
            //to activate this role.
            this.roleService.toggle(role.roleID).subscribe(
                result => {
                    role.isActive = true;
                    //--open snackbar
                    this.snackBar.open('You have enabled role #'+role.displayName, null, {
                        duration: 2000
                    });
                },
                error => {
                    console.log("Error", error);
                },
                () => {}
            );
        }
    }


    viewRole(role: Role) {
        this.roleService.routerToView(role.roleID);
    }
    /**
     * */
    editRole(roleId: string) {
        this.roleService.routeToEdit(roleId);
    }

    /**
     * */
    openDeleteDialog(role: Role) {
        let dialogRef = this.dialog.open(ConfirmDeleteDialog, this.config);
        dialogRef.componentInstance.role = role;
        dialogRef.afterClosed().subscribe(
            result => {
                console.log("RESULT", result);
                console.log("List", this.roleList);
                if (result) {
                    for (let i = 0; i < this.roleList.length; i++) {
                        let iRole = this.roleList[i];
                        if (iRole.roleID === role.roleID) {
                            this.roleList.splice(i, 1);
                            break;
                        }
                    }
                }
            }
        );
    }

}
