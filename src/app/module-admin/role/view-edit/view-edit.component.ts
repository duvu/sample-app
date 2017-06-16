import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {Role} from "../../../models/Role";
import {Account, RoleAcl} from "../../../models/RoleAcl";
import {ActivatedRoute} from "@angular/router";
import {RoleService} from "../../../services/role/role.service";
import {ChangeEvent} from "../event-change";
import {PermItemEvent} from "../../_com/perm-item-event";

const PERM_NONE     : number = 0;
const PERM_READ     : number = 1;
const PERM_WRITE    : number = 2;
const PERM_FULL     : number = 3;
const PERM_CUSTOM   : number = 4;
//
const PAGE_ADMIN_ACCOUNT: string    = 'admin:account';
const PAGE_ADMIN_ROLE: string       = 'admin:role';
const PAGE_ADMIN_DEVICE: string     = 'admin:device';
const PAGE_ADMIN_GROUP: string      = 'admin:group';
const PAGE_ADMIN_GEOZONE: string    = 'admin:geozone';
const PAGE_ADMIN_ALERT: string      = 'admin:alert';

@Component({
    selector: 'app-view-edit',
    templateUrl: './view-edit.component.html',
    styleUrls: ['./view-edit.component.scss']
})
export class ViewEditComponent implements OnInit {
    role: Role;
    roleAcl: RoleAcl;
    isEdit: boolean = false;
    roleId: string;
    accountAcl: any;
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    private _perm_account: number;
    private _perm_role: number;
    private _perm_device: number;
    private _perm_alert: number;
    private _perm_geozone: number;

    private _perm_map_live: number;
    private _perm_map_history: number;
    private _perm_report_summary: number;
    private _perm_report_speeding: number;
    private _perm_report_parking: number;
    private _perm_report_geozone: number;


    get perm_account(): number {
        return this._perm_account;
    }

    set perm_account(value: number) {
        this._perm_account = value;
    }

    get perm_role(): number {
        return this._perm_role;
    }

    set perm_role(value: number) {
        this._perm_role = value;
    }

    get perm_device(): number {
        return this._perm_device;
    }

    set perm_device(value: number) {
        this._perm_device = value;
    }

    get perm_alert(): number {
        return this._perm_alert;
    }

    set perm_alert(value: number) {
        this._perm_alert = value;
    }

    get perm_geozone(): number {
        return this._perm_geozone;
    }

    set perm_geozone(value: number) {
        this._perm_geozone = value;
    }

    get perm_map_live(): number {
        return this._perm_map_live;
    }

    set perm_map_live(value: number) {
        this._perm_map_live = value;
    }

    get perm_map_history(): number {
        return this._perm_map_history;
    }

    set perm_map_history(value: number) {
        this._perm_map_history = value;
    }

    get perm_report_summary(): number {
        return this._perm_report_summary;
    }

    set perm_report_summary(value: number) {
        this._perm_report_summary = value;
    }

    get perm_report_speeding(): number {
        return this._perm_report_speeding;
    }

    set perm_report_speeding(value: number) {
        this._perm_report_speeding = value;
    }

    get perm_report_parking(): number {
        return this._perm_report_parking;
    }

    set perm_report_parking(value: number) {
        this._perm_report_parking = value;
    }

    get perm_report_geozone(): number {
        return this._perm_report_geozone;
    }

    set perm_report_geozone(value: number) {
        this._perm_report_geozone = value;
    }

    //-------------------------------------------------------------------------
    permChange(o: ChangeEvent) {
        if (o.type === PAGE_ADMIN_ACCOUNT) {
            this.permChangeAccount(o);
        } else if (o.type === PAGE_ADMIN_ROLE) {
            this.permChangeRole(o);
        } else if (o.type === PAGE_ADMIN_DEVICE) {
            //todo
        }
    }
    permChangeAccount(event: ChangeEvent) {
        console.log('#Role', this.role);
        if (!this.role.Acl) {
            this.role.Acl = new RoleAcl();
        }
        this.perm_account = event.value;
        if (event.value < PERM_CUSTOM) {
            Account.setValue(this.role.Acl.fields.account, event.value);
        }
    }
    permChangeRole(event: ChangeEvent) {

    }

    permItemAccountChange(e: PermItemEvent) {
        this.role.Acl.fields.account[e.name] = e.value;
    }
    //-------------------------------------------------------------------------
    constructor(private route: ActivatedRoute,
                private _location: Location,
                private roleService: RoleService) { }

    ngOnInit() {
        this.route
            .queryParams
            .subscribe(params => {
                let action =  params['action'] || 'view';

                if (action === 'view') {
                    this.isEdit = false;
                } else {
                    this.isEdit = true;
                }
            });

        this.route.params.subscribe(
            params => {
                this.roleId = params['roleId'];
                this.getRole();
            },
            err => {},
            () => {
                console.log("Completed!");

            });
    }

    getRole() {
        this.roleService.getById(this.roleId).subscribe(
            role => {
                this.role = role;
                this.roleAcl = role.Acl;
                this.accountAcl = role.Acl.fields.account;

                this.perm_map_live = role.Acl.pages['map:live'];
                this.perm_map_history = role.Acl.pages['map:history'];
                this.perm_report_summary = role.Acl.pages['report:summary'];
                this.perm_report_speeding = role.Acl.pages['report:speeding'];
                this.perm_report_parking = role.Acl.pages['report:parking'];
                this.perm_report_geozone = role.Acl.pages['report:geozone'];
                this.perm_account = role.Acl.pages['admin:account'];
                this.perm_role = role.Acl.pages['admin:role'];
                this.perm_device = role.Acl.pages['admin:device'];
                this.perm_alert = role.Acl.pages['admin:alert'];
                this.perm_geozone = role.Acl.pages['admin:geozone'];
            },
            error => {},
            () => {}
        )
    }

    //--routing
    back() {
        this._location.back();
    }
    gotoRoles() {
        this.roleService.routerToRoleList();
    }
    cancelEditRole() {
        this.back();
    }
    editRole() {
        // this.isEdit = true;
        this.roleService.routeToEdit(this.roleId);
    }
    deleteRole() {
        // this.roleService.destroy(this.role.roleID).subscribe(
        //     data => {
        //         this.isError = false;
        //         this.errorMessage = "";
        //         this.dialogRef.close(data);
        //     },
        //     err => {
        //         this.isError = true;
        //         this.errorMessage = err.message;
        //     },
        //     () => {}
        // );
    }
    saveEditRole() {
        console.log(this.role);
        this.roleService.update(this.role).subscribe(
            data => {
                console.log(data);
            },
            err => {
                console.log(err);
            },
            () => {
                this.back();
            }
        )
    }
}
