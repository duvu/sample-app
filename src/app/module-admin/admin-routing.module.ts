import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from "./admin.component";

import {RoleListComponent} from "./role/list/role-list.component";
import {AddNewRoleComponent} from "./role/add/add-role.component";
import {ViewEditComponent} from "./role/view-edit/view-edit.component";

import {AccountComponent} from "./account/list/account.component";
import {AddAccountComponent} from "./account/add/add-account.component";
import {ViewAccountComponent} from "./account/view-edit/view-edit-account.component";

import {DeviceComponent} from "./device/list/device.component";
import {AddComponent as AddDeviceComponent} from "./device/add/add.component";
import {ViewEditComponent as ViewEditDeviceComponent} from "./device/view-edit/view-edit.component";

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            //Account
            { path: 'account', component: AccountComponent },
            { path: 'account/add', component: AddAccountComponent },
            { path: 'account/:accountId', component: ViewAccountComponent },
            //Role
            { path: 'role', component: RoleListComponent },
            { path: 'role/add', component: AddNewRoleComponent },
            { path: 'role/:roleId', component: ViewEditComponent },
            //Device
            { path: 'device', component: DeviceComponent},
            { path: 'device/add', component: AddDeviceComponent },
            { path: 'device/:deviceId', component: ViewEditDeviceComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
