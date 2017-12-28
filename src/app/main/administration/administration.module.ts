import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationComponent } from 'app/main/administration/administration.component';
import { AccountComponent } from 'app/main/administration/account/account.component';
import { DeviceComponent } from 'app/main/administration/device/device.component';
import { AdministrationRoutingModule} from 'app/main/administration/administration-routing.module';
import { MaterialShared} from 'app/shared/material-shared';
import { AccountService} from 'app/services/account.service';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddEditAccountComponent } from 'app/main/administration/account/add-edit-account/add-edit-account.component';
import { OptionalColumnAccountComponent } from 'app/main/administration/account/optional-column-account/optional-column-account.component';
import { OptionalColumnDeviceComponent } from 'app/main/administration/device/optional-column-device/optional-column-device.component';
import { AddEditDeviceComponent } from 'app/main/administration/device/add-edit-device/add-edit-device.component';
import { DeviceService } from 'app/services/device.service';
import { OrganizationComponent } from './organization/organization.component';
import { OrganizationService } from 'app/services/organization.service';
import { MyDirectivesModule } from 'app/directives/my-directives.module';
import { RoleUpdateComponent } from './account/role-update/role-update.component';
import {PrivilegeService} from "../../services/privilege.service";

@NgModule({
    imports: [
        CommonModule,
        MaterialShared,
        FormsModule,
        MyDirectivesModule,
        ReactiveFormsModule,
        AdministrationRoutingModule
    ],
    declarations: [
        AdministrationComponent,

        AccountComponent,
        AddEditAccountComponent,
        OptionalColumnAccountComponent,

        DeviceComponent,
        OptionalColumnDeviceComponent,
        AddEditDeviceComponent,
        OrganizationComponent,
        RoleUpdateComponent,
    ],
    providers: [
        OrganizationService,
        AccountService,
        DeviceService,
        PrivilegeService
    ],
    entryComponents: [
        AddEditAccountComponent,
        AddEditDeviceComponent,
        RoleUpdateComponent,

        OptionalColumnAccountComponent,
        OptionalColumnDeviceComponent
    ]
})
export class AdministrationModule { }
