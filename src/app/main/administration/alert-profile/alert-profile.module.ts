import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertProfileComponent } from './alert-profile.component';
import { AlertProfileRoutingModule } from 'app/main/administration/alert-profile/alert-profile-routing.module';

@NgModule({
    imports: [
        CommonModule,
        AlertProfileRoutingModule
    ],
    declarations: [
        AlertProfileComponent
    ]
})
export class AlertProfileModule { }
