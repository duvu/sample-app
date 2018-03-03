import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/shared/services/auth.guard';
import { ListGeozoneComponent } from 'app/main/administration/geozone/list-geozone/list-geozone.component';
import { AddEditGeozoneComponent } from 'app/main/administration/geozone/add-edit-geozone/add-edit-geozone.component';
import { GeozoneComponent } from 'app/main/administration/geozone/geozone.component';
const routes: Routes = [
    {
        path: '',
        component: GeozoneComponent,
        children:[
            { path: 'list',         component: ListGeozoneComponent,    canActivate: [AuthGuard] },
            { path: 'add-edit',     component: AddEditGeozoneComponent,    canActivate: [AuthGuard] }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class GeozoneRoutingModule { }
