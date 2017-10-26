import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SysAdminComponent } from 'app/main/sys-admin/sys-admin.component';
import { MenuComponent } from 'app/main/sys-admin/menu/menu.component';
import { AuthGuard } from 'app/services/auth.guard';
import { PrivilegeComponent } from 'app/main/sys-admin/privilege/privilege.component';
import { OrganizationComponent } from 'app/main/sys-admin/organization/organization.component';

const routes: Routes = [
    {
        path: '',
        component: SysAdminComponent,
        children:[
            { path: 'menu', component: MenuComponent, canActivate: [AuthGuard]},
            { path: 'privilege', component: PrivilegeComponent, canActivate: [AuthGuard]},
            { path: 'organization', component: OrganizationComponent, canActivate: [AuthGuard]},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SysAdminRoutingModule { }
