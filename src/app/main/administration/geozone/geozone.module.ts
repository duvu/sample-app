import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeozoneComponent } from 'app/main/administration/geozone/geozone.component';
import { MaterialShared } from 'app/shared/material-shared';
import { GeozoneRoutingModule } from 'app/main/administration/geozone/geozone-routing.module';

@NgModule({
  imports: [
    CommonModule,
      MaterialShared,
      GeozoneRoutingModule
  ],
  declarations: [
      GeozoneComponent
  ]
})
export class GeozoneModule { }
