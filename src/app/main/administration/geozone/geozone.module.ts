import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeozoneComponent } from 'app/main/administration/geozone/geozone.component';
import { AddEditGeozoneComponent } from 'app/main/administration/geozone/add-edit-geozone/add-edit-geozone.component';
import { MaterialShared } from 'app/shared/material-shared';
import { GeozoneRoutingModule } from 'app/main/administration/geozone/geozone-routing.module';
import { ListGeozoneComponent } from './list-geozone/list-geozone.component';

@NgModule({
  imports: [
    CommonModule,
      MaterialShared,
      GeozoneRoutingModule
  ],
  declarations: [
      GeozoneComponent,
      AddEditGeozoneComponent,
      ListGeozoneComponent
  ]
})
export class GeozoneModule { }
