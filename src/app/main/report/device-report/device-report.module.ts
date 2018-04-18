import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceReportRoutingModule } from 'app/main/report/device-report/device-report-routing.module';
import { DeviceReportComponent } from 'app/main/report/device-report/device-report.component';
import { MaterialShared } from 'app/shared/material-shared';

@NgModule({
    imports: [
        CommonModule,
        DeviceReportRoutingModule,
        MaterialShared
    ],
    declarations: [
        DeviceReportComponent
    ]
})
export class DeviceReportModule { }
