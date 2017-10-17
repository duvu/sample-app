import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationComponent } from './administration.component';
import { AccountComponent } from './account/account.component';
import { OrganizationComponent } from './organization/organization.component';
import { PrivilegeComponent } from './privilege/privilege.component';
import { DeviceComponent } from './device/device.component';
import {AdministrationRoutingModule} from "./administration-routing.module";
import {MaterialShared} from "../../shared/material-shared";

@NgModule({
    imports: [
        CommonModule,
        MaterialShared,
        AdministrationRoutingModule
    ],
    declarations: [
        AdministrationComponent,
        AccountComponent,
        DeviceComponent,
        OrganizationComponent,
        PrivilegeComponent
    ]
})
export class AdministrationModule { }
