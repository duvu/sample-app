import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsageComponent } from 'app/main/help/usage/usage.component';
import { DevelopmentComponent } from 'app/main/help/development/development.component';
import { EventLoggerComponent } from 'app/main/help/event-logger/event-logger.component';


const routes: Routes = [
    { path: '', redirectTo: 'usage', pathMatch: 'full' },
    { path: 'usage', component: UsageComponent },
    { path: 'development', component: DevelopmentComponent },
    { path: 'event-logger', component: EventLoggerComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HelpRoutingModule { }
