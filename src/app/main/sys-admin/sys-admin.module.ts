import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SysAdminRoutingModule } from 'app/main/sys-admin/sys-admin-routing.module';
import { DevelopmentComponent } from 'app/main/sys-admin/development/development.component';
import { EventLoggerComponent } from 'app/main/sys-admin/event-logger/event-logger.component';

@NgModule({
    imports: [
        CommonModule,
        SysAdminRoutingModule
    ],
    declarations: [
        DevelopmentComponent,
        EventLoggerComponent
    ]
})
export class SysAdminModule { }
