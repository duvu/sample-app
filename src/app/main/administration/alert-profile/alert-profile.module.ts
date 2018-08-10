import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertProfileComponent } from './alert-profile.component';
import { AlertProfileRoutingModule } from 'app/main/administration/alert-profile/alert-profile-routing.module';
import { AddEditAlertProfileComponent } from './add-edit-alert-profile/add-edit-alert-profile.component';
import { MaterialShared } from 'app/shared/material-shared';
import { CustomDirectivesModule } from 'app/directives/custom-directives.module';

@NgModule({
    imports: [
        CommonModule,
        MaterialShared,
        CustomDirectivesModule,
        AlertProfileRoutingModule
    ],
    declarations: [
        AlertProfileComponent,
        AddEditAlertProfileComponent
    ],
    entryComponents: [
        AddEditAlertProfileComponent
    ]
})
export class AlertProfileModule { }
