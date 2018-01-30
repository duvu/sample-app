import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { CommonModule} from '@angular/common';
import { FormsModule} from '@angular/forms';
import { MaterialShared} from '../shared/material-shared';
import { ConfirmDeleteComponent } from '../shared/components/confirm-delete/confirm-delete.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialShared,
        MainRoutingModule
    ],
    declarations: [
        MainComponent,
        ConfirmDeleteComponent
    ],
    providers: [
    ],
    entryComponents: [
        ConfirmDeleteComponent
    ]
})
export class MainModule { }
