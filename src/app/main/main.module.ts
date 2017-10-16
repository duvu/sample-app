import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { CommonModule} from "@angular/common";
import { FormsModule} from "@angular/forms";
import { MaterialShared} from "../shared/material-shared";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialShared,

        MainRoutingModule
    ],
    declarations: [
        MainComponent
    ],
    providers: [
    ]
})
export class MainModule { }
