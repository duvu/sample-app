import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsageComponent } from './usage/usage.component';
import { HelpRoutingModule } from 'app/main/help/help-routing.module';

@NgModule({
    imports: [
        CommonModule,
        HelpRoutingModule
    ],
    declarations: [
        UsageComponent
    ]
})
export class HelpModule { }
