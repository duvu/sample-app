import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevelopmentComponent } from 'app/main/sys-admin/development/development.component';
import { EventLoggerComponent } from 'app/main/sys-admin/event-logger/event-logger.component';

const routes: Routes = [
    { path: '', redirectTo: 'development', pathMatch: 'full' },
    { path: 'development', component: DevelopmentComponent },
    { path: 'event-logger', component: EventLoggerComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SysAdminRoutingModule { }
