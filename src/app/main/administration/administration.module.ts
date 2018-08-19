import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationComponent } from 'app/main/administration/administration.component';
import { AccountComponent } from 'app/main/administration/account/account.component';
import { AdministrationRoutingModule} from 'app/main/administration/administration-routing.module';
import { MaterialShared} from 'app/shared/material-shared';
import { AccountService} from 'app/services/account.service';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddEditAccountComponent } from 'app/main/administration/account/add-edit-account/add-edit-account.component';
import { OptionalColumnAccountComponent } from 'app/main/administration/account/optional-column-account/optional-column-account.component';
import { CompanyComponent } from './company/company.component';
import { CompanyService } from 'app/services/company.service';
import { CustomDirectivesModule } from 'app/directives/custom-directives.module';
import { AddEditCompanyComponent } from 'app/main/administration/company/add-edit-company/add-edit-company.component';
import { OptionalColumnCompanyComponent } from 'app/main/administration/company/optional-column-company/optional-column-company.component';
import { CustomPipeModule } from 'app/pipes/custom-pipe.module';

@NgModule({
    imports: [
        CustomPipeModule,
        CommonModule,
        MaterialShared,
        FormsModule,
        CustomDirectivesModule,
        ReactiveFormsModule,
        AdministrationRoutingModule
    ],
    declarations: [
        AdministrationComponent,
        AccountComponent,
        CompanyComponent,
        AddEditCompanyComponent,
        AddEditAccountComponent,
        OptionalColumnAccountComponent,
        OptionalColumnCompanyComponent,
    ],
    providers: [
        CompanyService,
        AccountService
    ],
    entryComponents: [
        AddEditAccountComponent,
        AddEditCompanyComponent,
        OptionalColumnAccountComponent,
        OptionalColumnCompanyComponent,
    ]
})
export class AdministrationModule { }
