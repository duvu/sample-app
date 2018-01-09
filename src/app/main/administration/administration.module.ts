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
import { CompanyComponent } from './company/organization.component';
import { CompanyService } from 'app/services/organization.service';
import { PrivilegeService} from 'app/services/privilege.service';
import { MyDirectivesModule } from 'app/shared/directives/my-directives.module';
import { AddEditOrganizationComponent } from 'app/main/administration/company/add-edit-organization/add-edit-organization.component';
import { OptionalColumnOrganizationComponent } from 'app/main/administration/company/optional-column-organization/optional-column-organization.component';
import { PrivilegeComponent } from 'app/main/administration/privilege/privilege.component';
import { FlattenPipe } from 'app/shared/pipes/flatten.pipe';
import { CustomPipeModule } from 'app/shared/pipes/custom-pipe.module';

@NgModule({
    imports: [
        CustomPipeModule,
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
        CompanyComponent,

        AddEditOrganizationComponent,
        OptionalColumnOrganizationComponent,

        PrivilegeComponent
    ],
    providers: [
        CompanyService,
        AccountService,
        DeviceService,
        PrivilegeService
    ],
    entryComponents: [
        AddEditAccountComponent,
        AddEditDeviceComponent,

        AddEditOrganizationComponent,
        OptionalColumnAccountComponent,
        OptionalColumnDeviceComponent,
        OptionalColumnOrganizationComponent
    ]
})
export class AdministrationModule { }
