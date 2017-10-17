import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from "./main.component";
import {AuthGuard} from "../services/guards/auth.guard";

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children:[
            { path: 'live',     loadChildren: 'app/main/dashboard/mapping.module#MappingModule', canActivate: [AuthGuard]},
            { path: 'report',   loadChildren: 'app/main/report/report.module#ReportModule',    canActivate: [AuthGuard]},
            { path: '_admin',    loadChildren: 'app/main/administration/administration.module#AdministrationModule', canActivate: [AuthGuard]}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
