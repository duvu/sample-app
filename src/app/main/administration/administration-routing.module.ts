import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AdministrationComponent} from "./administration.component";
import {AuthGuard} from 'app/services/auth.guard';
import {AccountComponent} from "./account/account.component";
import {DeviceComponent} from "./device/device.component";
import { OrganizationComponent } from 'app/main/administration/organization/organization.component';

const routes: Routes = [
    {
        path: '',
        component: AdministrationComponent,
        children:[
            { path: '_account', component: AccountComponent, canActivate: [AuthGuard]},
            { path: '_organization',   component: OrganizationComponent,    canActivate: [AuthGuard]},
            { path: '_device',   component: DeviceComponent,    canActivate: [AuthGuard]}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdministrationRoutingModule { }
