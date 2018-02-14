import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from 'app/main/report/report-routing.module';
import { ReportComponent } from 'app/main/report/device-report/report.component';
import { MaterialShared } from 'app/shared/material-shared';
import { DeviceService } from 'app/shared/services/device.service';
import { AccountReportComponent } from './account-report/account-report.component';
import { DriverReportComponent } from './driver-report/driver-report.component';
import { ShipmentReportComponent } from './shipment-report/shipment-report.component';
import { AlertHistoryComponent } from './alert-history/alert-history.component';

@NgModule({
    imports: [
        CommonModule,
        ReportRoutingModule,

        MaterialShared
    ],
    providers: [
        DeviceService
    ],
    declarations: [ReportComponent, AccountReportComponent, DriverReportComponent, ShipmentReportComponent, AlertHistoryComponent]
})
export class ReportModule { }
