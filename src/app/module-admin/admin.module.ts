import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { FlexLayoutModule}       from "@angular/flex-layout";
import { FormsModule}            from "@angular/forms";
import { FilterPipe}             from "app/pipes/filter.pipe";
import { RoleService}            from "../services/role/role.service";
import { AccountService}         from "../services/account/account.service";
import { ConfirmDeleteDialog}    from "./role/list/confirm-delete.dialog";
import { DisableDialog}          from "./role/list/confirm-disable.dialog";
import { RoleListComponent}      from "./role/list/role-list.component";
import { ViewEditComponent}      from "./role/view-edit/view-edit.component";
import { AddNewRoleComponent}    from "./role/add/add-role.component";
import { PermAccountComponent}   from "./role/perm-account.component";
import { PermBasicComponent}     from "./role/perm-basic.component";
import { PermComponent}          from "./_com/perm.comp";
import { PermItemComponent}      from "./_com/perm-item.comp";
import { PermDeviceComponent}    from "./role/perm-device.component";
import { AccountComponent}       from "./account/list/account.component";
import { ViewAccountComponent}   from "./account/view-edit/view-edit-account.component";
import { AddAccountComponent}    from "./account/add/add-account.component";
import { AdminRoutingModule }    from './admin-routing.module';
import { AdminComponent }        from './admin.component';
import { DeviceComponent }       from "./device/list/device.component";
import {AddComponent as AddDeviceComponent} from "./device/add/add.component";
import {ViewEditComponent as ViewEditDeviceComponent} from "./device/view-edit/view-edit.component";
import {
MdIconModule, MdListModule, MdSidenavModule, MdToolbarModule, MdButtonModule,
MdButtonToggleModule, MdCheckboxModule, MdDialogModule, MdInputModule, MdCardModule,
MdProgressSpinnerModule, MdSlideToggleModule, MdTooltipModule, MdSnackBarModule,
MdNativeDateModule, MdDatepickerModule, MdSelectModule
} from "@angular/material";
import { AddComponent } from './device/add/add.component';
import {DeviceService} from "app/services/device.service";
import {ConfirmDeleteDeviceDialog} from "./device/list/confirm-delete-device.dialog";
import { GroupComponent } from './group/group.component';
import { AddGroupComponent } from './group/add-group/add-group.component';
import { ViewEditGroupComponent } from './group/view-edit-group/view-edit-group.component';
@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        FormsModule,

        //--material-2
        MdButtonModule,
        MdButtonToggleModule,
        MdCardModule,
        MdCheckboxModule,
        MdDialogModule,
        MdDatepickerModule,
        MdNativeDateModule,
        MdIconModule,
        MdInputModule,
        MdListModule,
        MdProgressSpinnerModule,
        MdSelectModule,
        MdSidenavModule,
        MdSlideToggleModule,
        MdSnackBarModule,
        MdToolbarModule,
        MdTooltipModule,

        //--routing
        AdminRoutingModule
    ],
    declarations: [
        AdminComponent,
        //for Account
        AccountComponent,
        ViewAccountComponent,
        AddAccountComponent,
        //for Role
        RoleListComponent,
        ViewEditComponent,
        AddNewRoleComponent,
        ConfirmDeleteDialog,
        DisableDialog,
        PermAccountComponent,
        PermBasicComponent,
        PermComponent,
        PermItemComponent,
        PermDeviceComponent,
        //Device
        DeviceComponent,
        AddDeviceComponent,
        ViewEditDeviceComponent,
        ConfirmDeleteDeviceDialog,
        //Pipes
        FilterPipe,
        AddComponent,
        GroupComponent,
        AddGroupComponent,
        ViewEditGroupComponent,
    ],
    entryComponents: [
        ConfirmDeleteDialog,
        DisableDialog,

        //-- Device
        ConfirmDeleteDeviceDialog
    ],
    providers: [
        AccountService,
        RoleService,
        DeviceService
    ]
})
export class AdminModule { }
