import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from 'app/main/dashboard/dashboard-routing.module';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule
    ],
    declarations: [DashboardComponent]
})
export class DashboardModule { }
