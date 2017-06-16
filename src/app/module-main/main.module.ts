import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import {
    MdButtonModule,
    MdIconModule,
    MdListModule,
    MdMenuModule,
    MdToolbarModule
} from "@angular/material";
import { AppService } from "../services/app.service";
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [
        CommonModule,
        MdIconModule,
        MdListModule,
        MdButtonModule,
        MdMenuModule,
        MdToolbarModule,
        MainRoutingModule
    ],
    declarations: [
        MainComponent
    ],
    providers: [
        AppService
    ]
})
export class MainModule { }
