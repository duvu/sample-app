import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { MappingRoutingModule } from './mapping-routing.module';
import { MappingComponent } from './mapping.component';
import {CommonModule, DatePipe} from "@angular/common";
import {
    MdAutocompleteModule,
    MdButtonModule, MdIconModule, MdInputModule, MdListModule, MdProgressSpinnerModule,
    MdSidenavModule
} from "@angular/material";
import {DeviceService} from "../../services/device.service";
import {EventService} from "../../services/event.service";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MappingRoutingModule,
        MdAutocompleteModule,
        MdButtonModule,
        MdListModule,
        MdInputModule,
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
