import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { ContactRoutingModule } from 'app/main/administration/contact/contact-routing.module';
import { FormsModule } from '@angular/forms';
import { MaterialShared } from 'app/shared/material-shared';
import { AddEditContactComponent } from 'app/main/administration/contact/add-edit-contact/add-edit-contact.component';
import { OptionalColumnContactComponent } from './optional-column-contact/optional-column-contact.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialShared,
        ContactRoutingModule
    ],
    declarations: [
        ContactComponent,
        AddEditContactComponent,
        OptionalColumnContactComponent
    ],

    entryComponents: [
        AddEditContactComponent,
        OptionalColumnContactComponent
    ]
})
export class ContactModule { }
