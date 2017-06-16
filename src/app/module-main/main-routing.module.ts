import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from "./main.component";
import {AuthGuard} from "../guards/auth.guard";

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children:[
            /** routing to admin page*/
            { path: 'live',     loadChildren: 'app/module-mapping/mapping.module#MappingModule', canActivate: [AuthGuard]},
            { path: 'report',   loadChildren: 'app/module-report/report.module#ReportModule',    canActivate: [AuthGuard]},
            { path: 'admin',    loadChildren: 'app/module-admin/admin.module#AdminModule',       canActivate: [AuthGuard]}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
