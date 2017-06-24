import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {AccountService} from "../../../services/account/account.service";
import { Account } from "../../../models/Account";
import {RoleService} from "../../../services/role/role.service";
import {Role} from "../../../models/Role";
import {EnumUtils} from "../../../utils/EnumUtils";
import {SpeedUnits} from "../MeasureUnitsEnum";

@Component({
    selector: 'app-view-account',
    templateUrl: './view-edit-account.component.html',
    styleUrls: ['./view-edit-account.component.scss']
})
export class ViewAccountComponent implements OnInit {
    accountId: string;
    account: Account;
    accountAcl: any = {};
    isEdit: boolean = false;

    expirationTime: Date;

    SpeedUnits = SpeedUnits;
    SpeedUnitsArray = [];

    roleList: Role[];

    constructor(private route: ActivatedRoute,
                private accountService: AccountService,
                private roleService: RoleService) { }

    ngOnInit() {
        this.route.queryParams.subscribe(
            params => {
                let action = params['action'];
                this.isEdit = action === 'edit';
            }
        );
        this.route.params.subscribe(
            params => {
                this.accountId = params['accountId'];
                this.getAccount();
            },
            err => {},
            () => {
                console.log("Completed!");

            });
        this.loadRoleList();

        this.SpeedUnitsArray = EnumUtils.toArray(this.SpeedUnits);
    }
    loadRoleList() {
        this.roleService.getAll().subscribe(
            result => this.roleList = result as Role[],
            error => {},
            () => {
                //console.log('RoleList#', this.roleList);
            }
        );
    }
    getAccount() {
        this.accountService.get(this.accountId)
            .subscribe(
                account => {
                    this.account = account;
                    this.expirationTime = new Date(account.expirationTime * 1000);
                },
                error => {},
                () => {});
    }
    edit() {
        this.accountService.routeToEdit(this.accountId);
    }
    save() {
        this.account.expirationTime = this.expirationTime.getTime()/1000;
        this.accountService.update(this.account).subscribe(
            account => {
                //console.log('#updated', account);
                this.accountService.routeToList();
            },
            error => {},
            () => {}
        );
    }
    onBtnDelClick() {

    }
    cancel() {
        this.accountService.routeToView(this.accountId);
    }
}
