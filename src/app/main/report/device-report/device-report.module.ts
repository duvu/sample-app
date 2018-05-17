import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceReportRoutingModule } from 'app/main/report/device-report/device-report-routing.module';
import { DeviceReportComponent } from 'app/main/report/device-report/device-report.component';
import { MaterialShared } from 'app/shared/material-shared';
import { DSpeedComponent } from './d-speed/d-speed.component';
import { DParkingComponent } from './d-parking/d-parking.component';

@NgModule({
    imports: [
        CommonModule,
        DeviceReportRoutingModule,
        MaterialShared
    ],
    declarations: [
        DeviceReportComponent,
        DSpeedComponent,
        DParkingComponent
    ]
})
export class DeviceReportModule { }
