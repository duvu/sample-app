import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { MappingRoutingModule } from './mapping-routing.module';
import { MappingComponent } from './mapping.component';
import {CommonModule, DatePipe} from "@angular/common";
import {DeviceService} from 'app/shared/services/device.service';
import {EventService} from 'app/shared/services/event.service';
import { MaterialShared } from 'app/shared/material-shared';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MappingRoutingModule,
        MaterialShared
    ],
    providers: [
        DeviceService,
        EventService,
        DatePipe
    ],
    declarations: [MappingComponent]
})
export class MappingModule { }
