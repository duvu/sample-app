import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsageComponent } from './usage.component';
import { UsageRoutingModule } from 'app/main/usage/usage-routing.module';

@NgModule({
    imports: [
        CommonModule,
        UsageRoutingModule
    ],
    declarations: [UsageComponent]
})
export class UsageModule { }
