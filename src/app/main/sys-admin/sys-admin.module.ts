import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SysAdminComponent } from 'app/main/sys-admin/sys-admin.component';
import { MenuComponent } from 'app/main/sys-admin/menu/menu.component';
import { PrivilegeComponent } from 'app/main/sys-admin/privilege/privilege.component';
import { AccountComponent } from './account/account.component';
import { SysAdminRoutingModule } from 'app/main/sys-admin/sys-admin-routing.module';
import { OrganizationComponent } from 'app/main/sys-admin/organization/organization.component';

import { OrganizationService } from 'app/services/organization.service';
import { PrivilegeService } from 'app/services/privilege.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialShared } from 'app/shared/material-shared';
import { AddEditOrganizationComponent } from 'app/main/sys-admin/organization/add-edit-organization/add-edit-organization.component';
import { AddEditPrivilegeComponent } from 'app/main/sys-admin/privilege/add-edit-privilege/add-edit-privilege.component';
import { OptionalColumnPrivilegeComponent } from 'app/main/sys-admin/privilege/optional-column-privilege/optional-column-privilege.component';
import { OptionalColumnOrganizationComponent } from 'app/main/sys-admin/organization/optional-column-organization/optional-column-organization.component';

@NgModule({
    imports: [
        CommonModule,
        SysAdminRoutingModule,

        MaterialShared,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        SysAdminComponent,
        MenuComponent,
        AccountComponent,
        PrivilegeComponent,
        OrganizationComponent,

        AddEditOrganizationComponent,
        AddEditPrivilegeComponent,
        OptionalColumnPrivilegeComponent,
        OptionalColumnOrganizationComponent
    ],
    providers: [
        OrganizationService,
        PrivilegeService
    ],
    entryComponents: [
        AddEditOrganizationComponent,
        AddEditPrivilegeComponent,
        OptionalColumnPrivilegeComponent,
        OptionalColumnOrganizationComponent
    ]
})
export class SysAdminModule { }
