import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertProfileComponent } from 'app/main/administration/alert-profile/alert-profile.component';

const routes: Routes = [
    {
        path: '',
        component: AlertProfileComponent,
        children:[
            // { path: '_account',     component: AccountComponent,    canActivate: [AuthGuard] },
            // {
            //     path: '_company',
            //     component: CompanyComponent,
            //     canActivate: [SysAdminGuard],
            //     canLoad: [SysAdminGuard]
            // },
            // { path: '_device',      component: DeviceComponent,     canActivate: [AuthGuard] },
            // { path: '_driver',      component: DriverComponent,     canActivate: [AuthGuard] },
            // { path: '_vehicle',     component: DeviceComponent,     canActivate: [AuthGuard] },
            // {
            //     path: '_geozone',
            //     loadChildren: 'app/main/administration/geozone/geozone.module#GeozoneModule',
            //     canActivate: [AuthGuard]
            // },
            // {
            //     path: '_alert',
            //     loadChildren: 'app/main/administration/alert-profile/alert-profile.module#AlertProfileModule',
            //     canActivate: [AuthGuard]
            // },
            // { path: '_privilege',   component: PrivilegeComponent,  canActivate: [AuthGuard] },
            // { path: '_dcs',         component: DcsComponent,        canActivate: [AuthGuard] }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AlertProfileRoutingModule { }
