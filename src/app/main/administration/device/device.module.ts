import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceComponent } from 'app/main/administration/device/device.component';
import { AddEditDeviceComponent } from 'app/main/administration/device/add-edit-device/add-edit-device.component';
import { OptionalColumnDeviceComponent } from 'app/main/administration/device/optional-column-device/optional-column-device.component';
import { DeviceService } from 'app/services/device.service';
import { DeviceRoutingModule } from 'app/main/administration/device/device-routing.module';
import { CustomPipeModule } from 'app/pipes/custom-pipe.module';
import { MaterialShared } from 'app/shared/material-shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomDirectivesModule } from 'app/directives/custom-directives.module';

@NgModule({
    imports: [
        CommonModule,
        CustomPipeModule,
        MaterialShared,
        FormsModule,
        CustomDirectivesModule,
        ReactiveFormsModule,
        DeviceRoutingModule
    ],
    providers: [
        DeviceService
    ],
    declarations: [
        DeviceComponent,
        AddEditDeviceComponent,
        OptionalColumnDeviceComponent,
    ],
    entryComponents: [
        AddEditDeviceComponent,
        OptionalColumnDeviceComponent,
    ]
})
export class DeviceModule { }
