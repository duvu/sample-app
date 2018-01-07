import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AdministrationComponent} from "./administration.component";
import {AuthGuard} from 'app/services/auth.guard';
import {AccountComponent} from "./account/account.component";
import {DeviceComponent} from "./device/device.component";
import { CompanyComponent } from 'app/main/administration/company/organization.component';
import { PrivilegeComponent } from 'app/main/administration/privilege/privilege.component';

const routes: Routes = [
    {
        path: '',
        component: AdministrationComponent,
        children:[
            { path: '_account', component: AccountComponent, canActivate: [AuthGuard] },
            { path: '_company',   component: CompanyComponent,    canActivate: [AuthGuard] },
            { path: '_device',   component: DeviceComponent,    canActivate: [AuthGuard] },
            { path: '_privilege',   component: PrivilegeComponent,    canActivate: [AuthGuard] }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdministrationRoutingModule { }
