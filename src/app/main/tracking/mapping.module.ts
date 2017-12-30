import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { MappingRoutingModule } from './mapping-routing.module';
import { MappingComponent } from './mapping.component';
import {CommonModule, DatePipe} from "@angular/common";
import {
    MatAutocompleteModule,
    MatButtonModule, MatIconModule, MatInputModule, MatListModule, MatProgressSpinnerModule,
    MatSidenavModule
} from "@angular/material";
import {DeviceService} from 'app/services/device.service';
import {EventService} from 'app/services/event.service';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MappingRoutingModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatListModule,
        MatInputModule,
        MatSidenavModule,
        MatProgressSpinnerModule,
        MatIconModule
    ],
    providers: [
        DeviceService,
        EventService,
        DatePipe
    ],
    declarations: [MappingComponent]
})
export class MappingModule { }
