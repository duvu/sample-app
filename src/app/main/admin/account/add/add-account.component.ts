import { Component, OnInit } from '@angular/core';
import { Account } from '../../../../models/Account';
import {Location} from "@angular/common";
import {AccountService} from "../../../../services/account/account.service";
import {RoleService} from "../../../../services/role/role.service";
import {Role} from "../../../../models/Role";

@Component({
    selector: 'app-add-account',
    templateUrl: './add-account.component.html',
    styleUrls: ['./add-account.component.scss']
})
export class AddAccountComponent implements OnInit {
    account: Account = new Account();
    accountAcl: any = {};
    roleList: Role[];

    //--errorMessage
    errorMessage: string;

    constructor(private _location: Location, private accountService: AccountService, private roleService: RoleService) { }

    ngOnInit() {
        this.loadRoleList();
    }
    back() {
        this._location.back();
    }
    cancel() {
        this.account = null;
        this.accountAcl = null;
        this.back();
    }
    loadRoleList() {
        this.roleService.getAll().subscribe(
            result => this.roleList = result as Role[],
            error => {},
            () => {
                console.log('RoleList#', this.roleList);
            }
        );
    }

    addNewAccount() {
        this.accountService.addNew(this.account).subscribe(
            result => {
                this.back();
            },
            error => {
                console.log("ERROR", error);
                this.errorMessage = error;
            },
            () => {}
        );
    }
}
