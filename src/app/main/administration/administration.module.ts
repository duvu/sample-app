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
        AddEditAccountComponent,
        OptionalColumnAccountComponent,

        DeviceComponent,
        OptionalColumnDeviceComponent,
        AddEditDeviceComponent,
    ],
    providers: [
        AccountService,
        DeviceService
    ],
    entryComponents: [
        AddEditAccountComponent,
        AddEditDeviceComponent,

        OptionalColumnAccountComponent,
        OptionalColumnDeviceComponent
    ]
})
export class AdministrationModule { }
