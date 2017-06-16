import { Component, OnInit } from '@angular/core';
import {Role} from "../../../models/Role";
import {RoleAcl} from "../../../models/RoleAcl";
import {RoleService} from "../../../services/role/role.service";
import {ChangeEvent} from "../event-change";
import {PermItemEvent} from "../../_com/perm-item-event";
import {Location} from "@angular/common";

const PERM_NONE     : number = 0;
const PERM_READ     : number = 1;
const PERM_WRITE    : number = 2;
const PERM_FULL     : number = 3;
const PERM_CUSTOM   : number = 4;

const PAGE_ADMIN_ACCOUNT: string    = 'admin:account';
const PAGE_ADMIN_ROLE: string       = 'admin:role';
const PAGE_ADMIN_DEVICE: string     = 'admin:device';
const PAGE_ADMIN_GROUP: string      = 'admin:group';
const PAGE_ADMIN_GEOZONE: string    = 'admin:geozone';
const PAGE_ADMIN_ALERT: string      = 'admin:alert';


@Component({
    selector: 'app-add',
    templateUrl: './add-role.component.html',
    styleUrls: ['./add-role.component.scss']
})

export class AddNewRoleComponent implements OnInit {

    private _isAdministrator: boolean = false;
    private _newRole: Role;
    private _newRoleAcl: RoleAcl;

    private _perm_account: number = 4;
    private _perm_role: number;
    private _perm_device: number = 4;
    private _perm_alert: number;
    private _perm_geozone: number;

    private _perm_map_live: number;
    private _perm_map_history: number;
    private _perm_report_summary: number;
    private _perm_report_speeding: number;
    private _perm_report_parking: number;
    private _perm_report_geozone: number;

    // private _showContent: number = 0;

    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
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
    //-------------------------------------------------------------------------
    get isAdministrator(): boolean {
        return this._isAdministrator;
    }

    set isAdministrator(value: boolean) {
        this._isAdministrator = value;
    }

    get newRole(): Role {
        return this._newRole;
    }

    set newRole(value: Role) {
        this._newRole = value;
    }

    get newRoleAcl(): RoleAcl {
        return this._newRoleAcl;
    }

    set newRoleAcl(value: RoleAcl) {
        this._newRoleAcl = value;
    }
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    constructor(private roleService: RoleService, private _location: Location) {

    }
    ngOnInit() {
        this.newRole = new Role;
        this.newRoleAcl = new RoleAcl;
        //---------
        this.newRoleAcl.pages[PAGE_ADMIN_ACCOUNT] = this.newRoleAcl.fields.account.get();
        this.newRoleAcl.pages[PAGE_ADMIN_ROLE] = this.newRoleAcl.fields.role.get();
        this.newRoleAcl.pages[PAGE_ADMIN_DEVICE] = this.newRoleAcl.fields.device.get();
    }

    permChange(o: ChangeEvent) {
        console.log('Why it run here!', o);
        if (o.type === PAGE_ADMIN_ACCOUNT) {
            this.permChangeAccount(o);
        } else if (o.type === PAGE_ADMIN_ROLE) {
            this.permChangeRole(o);
        } else if (o.type === PAGE_ADMIN_DEVICE) {
            //todo
        }
    }
    permChangeAccount(event: ChangeEvent) {
        if (event.value < PERM_CUSTOM) {
            this.perm_account = event.value;
            this.newRoleAcl.fields.account.set(event.value);
        } else {
            this.perm_account = event.value;
        }
    }
    permChangeRole(event: ChangeEvent) {

    }

    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    permItemAccountChange(e: PermItemEvent) {
        this.newRoleAcl.fields.account[e.name] = e.value;
    }
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    back() {
        this._location.back();
    }
    gotoRoles() {
        this.roleService.routerToRoleList();
    }
    cancelNewRole() {
        this.newRole = null;
        this.back();
    }
    saveNewRole() {
        this.newRole.Acl = this.newRoleAcl;
        console.log(this.newRole);

        this.roleService.add(this.newRole).subscribe(
            data => {console.log(data)},
            err => console.log(err),
            () => {
                //todo redirect back
                this.gotoRoles();
            }
        )
    }

}
