import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationComponent } from './administration.component';
import { AccountComponent } from './account/account.component';
import { OrganizationComponent } from './organization/organization.component';
import { PrivilegeComponent } from './privilege/privilege.component';
import { DeviceComponent } from './device/device.component';
import { AdministrationRoutingModule} from './administration-routing.module';
import { MaterialShared} from '../../shared/material-shared';
import { AccountService} from '../../services/account.service';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddEditAccountComponent } from './account/add-edit-account/add-edit-account.component';
import { OptionalColumnAccountComponent } from './account/optional-column-account/optional-column-account.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialShared,
        FormsModule,
        ReactiveFormsModule,
        AdministrationRoutingModule
    ],
    declarations: [
        AdministrationComponent,
        AccountComponent,
        DeviceComponent,
        OrganizationComponent,
        PrivilegeComponent,
        AddEditAccountComponent,
        OptionalColumnAccountComponent
    ],
    providers: [
        AccountService
    ],
    entryComponents: [
        AddEditAccountComponent,
        OptionalColumnAccountComponent
    ]
})
export class AdministrationModule { }
