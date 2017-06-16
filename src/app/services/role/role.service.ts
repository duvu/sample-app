import { Injectable } from '@angular/core';
import {AuthHttp, AuthHttpError} from "angular2-jwt";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Response} from "@angular/http";
import {BaseService} from "../base.service";
import {Role} from "../../models/Role";

const APP_PATH_ROLE:string = '/m/admin/role';
const API_ROLE_PATH:string = '/api/role/';

@Injectable()
export class RoleService extends BaseService{

    constructor(private http: AuthHttp, protected router: Router) {
        super(router);
    }

    getAll() :Observable<Role[]> {
        return this.http.get(API_ROLE_PATH)
            .map(roles => roles.json() as Role[])
            .catch(this.error);
    }
    getById(roleId: string): Observable<Role> {
        let url = API_ROLE_PATH + roleId;
        return this.http.get(url)
            .map(roles => roles.json() as Role)
            .catch(this.error);
    }
    toggle(roleId: string): Observable<Role> {
        let url = API_ROLE_PATH + roleId + "?action=toggle";
        return this.http.get(url)
        .map(role => role.json() as Role)
        .catch(this.error);
    }
    add(data: Role) :Observable<Role> {
        return this.http.post(API_ROLE_PATH, data)
            .map(role => role.json() as Role)
            .catch(this.error);
    }
    update(data: Role): Observable<Role> {
        let url = API_ROLE_PATH + data.roleID;
        return this.http.post(url, data)
            .map(role => role.json() as Role)
            .catch(this.error)
            .finally(function () {
                //noop
            });
    }

    _delete(roleId: string) : Observable<Response> {
        let url = API_ROLE_PATH + roleId;
        return this.http.delete(url)
            .map(role => {
                return role.json()
            }).catch(this.error);
    }

    /**************************************************************************/
    /* Role Routing                                                           */
    /**************************************************************************/
    routerToRoleList() {
        this.router.navigate([APP_PATH_ROLE])
    }
    routerToView(roleId: string) {
        // this.router.navigate([APP_PATH_ROLE, 'view', roleId]);
        this.router.navigate( [APP_PATH_ROLE, roleId], { queryParams: { action: "view" } });
    }
    routeToEdit(roleId: string) {
        this.router.navigate([APP_PATH_ROLE, roleId], { queryParams: { action: "edit" } });
    }
    navigate(params: [string]) {
        let route  = [APP_PATH_ROLE].concat(params);
        this.router.navigate(route)
    }
}
