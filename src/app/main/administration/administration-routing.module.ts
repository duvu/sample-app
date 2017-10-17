import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AdministrationComponent} from "./administration.component";
import {AuthGuard} from "../../services/auth.guard";
import {AccountComponent} from "./account/account.component";
import {DeviceComponent} from "./device/device.component";
import {OrganizationComponent} from "./organization/organization.component";
import {PrivilegeComponent} from "./privilege/privilege.component";

const routes: Routes = [
    {
        path: '',
        component: AdministrationComponent,
        children:[
            { path: '_account', component: AccountComponent, canActivate: [AuthGuard]},
            { path: '_device',   component: DeviceComponent,    canActivate: [AuthGuard]},
            { path: '_org',    component: OrganizationComponent, canActivate: [AuthGuard]},
            { path: '_pri',    component: PrivilegeComponent, canActivate: [AuthGuard]}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdministrationRoutingModule { }
