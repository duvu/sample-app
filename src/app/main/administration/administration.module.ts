import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationComponent } from 'app/main/administration/administration.component';
import { AccountComponent } from 'app/main/administration/account/account.component';
import { DeviceComponent } from 'app/main/administration/device/device.component';
import { AdministrationRoutingModule} from 'app/main/administration/administration-routing.module';
import { MaterialShared} from 'app/shared/material-shared';
import { AccountService} from 'app/shared/services/account.service';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddEditAccountComponent } from 'app/main/administration/account/add-edit-account/add-edit-account.component';
import { OptionalColumnAccountComponent } from 'app/main/administration/account/optional-column-account/optional-column-account.component';
import { OptionalColumnDeviceComponent } from 'app/main/administration/device/optional-column-device/optional-column-device.component';
import { AddEditDeviceComponent } from 'app/main/administration/device/add-edit-device/add-edit-device.component';
import { DeviceService } from 'app/shared/services/device.service';
import { CompanyComponent } from './company/organization.component';
import { CompanyService } from 'app/shared/services/organization.service';
import { PrivilegeService} from 'app/shared/services/privilege.service';
import { MyDirectivesModule } from 'app/shared/directives/my-directives.module';
import { AddEditOrganizationComponent } from 'app/main/administration/company/add-edit-organization/add-edit-organization.component';
import { OptionalColumnOrganizationComponent } from 'app/main/administration/company/optional-column-organization/optional-column-organization.component';
import { PrivilegeComponent } from 'app/main/administration/privilege/privilege.component';
import { CustomPipeModule } from 'app/shared/pipes/custom-pipe.module';
import { DcsComponent } from './dcs/dcs.component';
import { GeozoneComponent } from './geozone/geozone.component';
import { AlertRuleComponent } from './alert-rule/alert-rule.component';
import { DcsService } from 'app/shared/services/dcs.service';
import { AddEditDcsComponent } from './dcs/add-edit-dcs/add-edit-dcs.component';
import { OptionalColumnPrivilegeComponent } from 'app/main/administration/privilege/optional-column-privilege/optional-column-privilege.component';
import { AddEditPrivilegeComponent } from 'app/main/administration/privilege/add-edit-privilege/add-edit-privilege.component';

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
        CompanyComponent,
        DeviceComponent,
        PrivilegeComponent,
        DcsComponent,
        GeozoneComponent,
        AlertRuleComponent,

        AddEditDeviceComponent,
        AddEditPrivilegeComponent,
        AddEditOrganizationComponent,
        AddEditAccountComponent,
        AddEditDcsComponent,

        OptionalColumnDeviceComponent,
        OptionalColumnAccountComponent,
        OptionalColumnOrganizationComponent,
        OptionalColumnPrivilegeComponent,
    ],
    providers: [
        CompanyService,
        AccountService,
        DeviceService,
        PrivilegeService,
        DcsService
    ],
    entryComponents: [
        AddEditAccountComponent,
        AddEditDeviceComponent,
        AddEditDcsComponent,
        AddEditOrganizationComponent,
        AddEditPrivilegeComponent,
        OptionalColumnAccountComponent,
        OptionalColumnDeviceComponent,
        OptionalColumnOrganizationComponent,
        OptionalColumnPrivilegeComponent
    ]
})
export class AdministrationModule { }
