import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeozoneComponent } from 'app/main/administration/geozone/geozone.component';
import { MaterialShared } from 'app/shared/material-shared';
import { GeozoneRoutingModule } from 'app/main/administration/geozone/geozone-routing.module';
import { GeozoneService } from 'app/shared/services/geozone.service';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialShared,
        GeozoneRoutingModule
    ],
    providers: [
        GeozoneService
    ],
    declarations: [
        GeozoneComponent
    ],
    entryComponents: []
})
export class GeozoneModule { }
