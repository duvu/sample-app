import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MappingComponent} from 'app/main/tracking/live/mapping.component';
import { HistoryComponent } from 'app/main/tracking/history/history.component';

const routes: Routes = [
    { path: '', component: MappingComponent },
    { path: 'history/:id', component: HistoryComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MappingRoutingModule { }
