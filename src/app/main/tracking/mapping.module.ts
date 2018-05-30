import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { MappingRoutingModule } from 'app/main/tracking/mapping-routing.module';
import { MappingComponent } from 'app/main/tracking/live/mapping.component';
import { CommonModule, DatePipe} from "@angular/common";
import { DeviceService} from 'app/shared/services/device.service';
import {EventService} from 'app/shared/services/event.service';
import { MaterialShared } from 'app/shared/material-shared';
import { HistoryComponent } from './history/history.component';
import { PopupService } from 'app/main/tracking/live/popup/popup.service';
import { PopupComponent } from 'app/main/tracking/live/popup/popup.component';
import { SharedModule } from 'app/shared/shared.module';
import { SpeedChartComponent } from 'app/main/tracking/live/speed-chart/speed-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgxChartsModule,
        MappingRoutingModule,
        MaterialShared,
        SharedModule
    ],
    providers: [
        DeviceService,
        PopupService,
        EventService,
        DatePipe
    ],

    entryComponents: [
      PopupComponent
    ],
    declarations: [
        MappingComponent,
        HistoryComponent,
        PopupComponent,
        SpeedChartComponent
    ]
})
export class MappingModule { }
