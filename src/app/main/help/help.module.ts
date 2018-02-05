import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsageComponent } from './usage/usage.component';
import { HelpRoutingModule } from 'app/main/help/help-routing.module';
import { DevelopmentComponent } from './development/development.component';
import { EventLoggerComponent } from './event-logger/event-logger.component';

@NgModule({
    imports: [
        CommonModule,
        HelpRoutingModule
    ],
    declarations: [UsageComponent, DevelopmentComponent, EventLoggerComponent]
})
export class HelpModule { }
