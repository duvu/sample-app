import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from 'app/main/report/report-routing.module';
import { MaterialShared } from 'app/shared/material-shared';
import { DeviceService } from 'app/shared/services/device.service';
import { AccountReportComponent } from 'app/main/report/account-report/account-report.component';
import { DriverReportComponent } from 'app/main/report/driver-report/driver-report.component';
import { ShipmentReportComponent } from 'app/main/report/shipment-report/shipment-report.component';
import { AlertHistoryComponent } from 'app/main/report/alert-history/alert-history.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        ReportRoutingModule,

        MaterialShared
    ],
    providers: [
        DeviceService
    ],
    declarations: [
        AccountReportComponent,
        DriverReportComponent,
        ShipmentReportComponent,
        AlertHistoryComponent
    ]
})
export class ReportModule { }
