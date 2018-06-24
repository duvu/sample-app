import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { CommonModule} from '@angular/common';
import { FormsModule} from '@angular/forms';
import { MaterialShared} from 'app/shared/material-shared';
import { ConfirmDeleteComponent } from 'app/shared/components/confirm-delete/confirm-delete.component';
import { ProfileComponent } from 'app/main/profile/profile.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialShared,
        MainRoutingModule,
    ],
    declarations: [
        MainComponent,
        ConfirmDeleteComponent,
        ProfileComponent
    ],
    providers: [
    ],
    entryComponents: [
        ConfirmDeleteComponent
    ]
})
export class MainModule { }
