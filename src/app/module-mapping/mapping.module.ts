import { NgModule } from '@angular/core';

import { MappingRoutingModule } from './mapping-routing.module';
import { MappingComponent } from './mapping.component';
import {CommonModule} from "@angular/common";
import {MdIconModule, MdListModule, MdSidenavModule} from "@angular/material";
import {DeviceService} from "../services/device.service";
import {EventService} from "../services/event.service";


@NgModule({
    imports: [
        CommonModule,
        MappingRoutingModule,
        MdListModule,

        MdSidenavModule,
        MdIconModule
    ],
    providers: [
        DeviceService,
        EventService
    ],
    declarations: [MappingComponent]
})
export class MappingModule { }
