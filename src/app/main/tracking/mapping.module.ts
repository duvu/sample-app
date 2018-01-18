import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { MappingRoutingModule } from 'app/main/tracking/mapping-routing.module';
import { MappingComponent } from 'app/main/tracking/live/mapping.component';
import { CommonModule, DatePipe} from "@angular/common";
import { DeviceService} from 'app/shared/services/device.service';
import {EventService} from 'app/shared/services/event.service';
import { MaterialShared } from 'app/shared/material-shared';
import { HistoryComponent } from './history/history.component';
import { FacilityLinkComponent, LinkPopupService } from 'app/main/tracking/LinkPopupService';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MappingRoutingModule,
        MaterialShared
    ],
    providers: [
        DeviceService,
        LinkPopupService,
        EventService,
        DatePipe
    ],

    entryComponents: [
      FacilityLinkComponent
    ],
    declarations: [
        MappingComponent,
        HistoryComponent,
        FacilityLinkComponent
    ]
})
export class MappingModule { }
