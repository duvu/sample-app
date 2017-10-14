import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ChangeEvent} from "./event-change";
@Component({
    selector: 'perm-basic',
    templateUrl: './perm-basic.component.html',
    styleUrls: ['./add/add-role.component.scss']
})

export class PermBasicComponent {
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

    private _is_edit: boolean = false;

    @Output() change = new EventEmitter<ChangeEvent>();

    @Input()
    get is_edit(): boolean {
        return this._is_edit;
    }

    set is_edit(value: boolean) {
        this._is_edit = value;
    }

    @Input()
    set permAccount (perm_account: number) {
        this._perm_account = perm_account;
    }
    get permAccount() : number {
        return this._perm_account;
    }
    @Input()
    set permRole(perm_role: number) {
        this._perm_role = perm_role;
    }
    get permRole(): number {
        return this._perm_role;
    }

    @Input()
    set permDevice(perm_device: number) {
        this._perm_device = perm_device;
    }
    get permDevice() : number {
        return this._perm_device;
    }
    @Input()
    set permAlert(perm_alert: number) {
        this._perm_alert = perm_alert;
    }
    get permAlert(): number {
        return this._perm_alert;
    }
    @Input()
    set permGeozone(perm_geozone: number) {
        this._perm_geozone = perm_geozone;
    }
    get permGeozone(): number {
        return this._perm_geozone;
    }

    @Input()
    set permMapLive(perm_map_live: number) {
        this._perm_map_live = perm_map_live;
    }
    get permMapLive(): number {
        return this._perm_map_live;
    }
    @Input()
    set permMapHistory(perm_map_history: number) {
        this._perm_map_history = perm_map_history;
    }
    get permMapHistory(): number {
        return this._perm_map_history;
    }

    @Input()
    set permReportSummary(perm_report_summary: number) {
        this._perm_report_summary = perm_report_summary;
    }
    get permReportSummary(): number {
        return this._perm_report_summary;
    }
    @Input()
    set permReportSpeeding(perm_report_speeding: number) {
        this._perm_report_speeding = perm_report_speeding;
    }
    get permReportSpeeding(): number {
        return this._perm_report_speeding;
    }
    @Input()
    set permReportParking(perm_report_parking: number) {
        this._perm_report_parking = perm_report_parking;
    }
    get permReportParking(): number {
        return this._perm_report_parking;
    }
    @Input()
    set permReportGeozone(perm_report_geozone: number) {
        this._perm_report_geozone = perm_report_geozone;
    }
    get permReportGeozone(): number {
        return this._perm_report_geozone;
    }

    constructor() { }


    permAccountChanged(value: number) {
        let event:ChangeEvent = new ChangeEvent('admin:account', value);
        this.change.emit(event);
    }
    permRoleChange(value: number) {
        let event:ChangeEvent = new ChangeEvent('admin:role', value);
        this.change.emit(event);
    }
}
