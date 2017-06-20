import { NgModule } from '@angular/core';

import { MappingRoutingModule } from './mapping-routing.module';
import { MappingComponent } from './mapping.component';
import {CommonModule, DatePipe} from "@angular/common";
import {MdIconModule, MdListModule, MdProgressSpinnerModule, MdSidenavModule} from "@angular/material";
import {DeviceService} from "../services/device.service";
import {EventService} from "../services/event.service";


@NgModule({
    imports: [
        CommonModule,
        MappingRoutingModule,
        MdListModule,

        MdSidenavModule,
        MdProgressSpinnerModule,
        MdIconModule
    ],
    providers: [
        DeviceService,
        EventService,
        DatePipe
    ],
    declarations: [MappingComponent]
})
export class MappingModule { }
