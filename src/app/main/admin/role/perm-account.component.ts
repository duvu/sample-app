import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Account} from "../../../models/RoleAcl";
import {PermItemEvent} from "../_com/perm-item-event";

@Component({
    selector: 'perm-account',
    templateUrl: './perm-account.component.html',
    styleUrls: ['./add/add-role.component.scss']
})
export class PermAccountComponent {
    private _account_acl: Account;
    @Input() accountAcl: Account;

    private _is_edit: boolean;

    @Input()
    get is_edit(): boolean {
        return this._is_edit;
    }

    set is_edit(value: boolean) {
        this._is_edit = value;
    }
    @Input()
    get account_acl(): Account {
        return this._account_acl;
    }

    set account_acl(value: Account) {
        this._account_acl = value;
    }

    @Output() change = new EventEmitter<PermItemEvent>();
    constructor() {
    }

    permItemChanged(e: PermItemEvent) {
        this.change.emit(e)
    }
}
