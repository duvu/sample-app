import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRoutingModule } from 'app/main/administration/company/company-routing.module';
import { CompanyComponent } from 'app/main/administration/company/company.component';
import { AddEditCompanyComponent } from 'app/main/administration/company/add-edit-company/add-edit-company.component';
import { OptionalColumnCompanyComponent } from 'app/main/administration/company/optional-column-company/optional-column-company.component';
import { DeleteCompanyComponent } from './delete-company/delete-company.component';
import { CompanyService } from 'app/services/company.service';
import { MaterialShared } from 'app/shared/material-shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomDirectivesModule } from 'app/directives/custom-directives.module';

@NgModule({
    imports: [
        CommonModule,
        MaterialShared,
        FormsModule,
        CustomDirectivesModule,
        ReactiveFormsModule,
        CompanyRoutingModule
    ],
    declarations: [
        CompanyComponent,
        AddEditCompanyComponent,
        OptionalColumnCompanyComponent,
        DeleteCompanyComponent
    ],
    entryComponents: [
        AddEditCompanyComponent,
        OptionalColumnCompanyComponent,
        DeleteCompanyComponent
    ],
    providers: [
        CompanyService
    ]
})
export class CompanyModule { }
