import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CommonModule} from '@angular/common';
import { LoginComponent} from 'app/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { MaterialShared} from 'app/shared/material-shared';
import { AuthInterceptor} from 'app/shared/services/auth-interceptor';
import { ApplicationContext} from 'app/shared/services/application-context.service';
import { AppComponent } from 'app/app.component';
import { AppRoutingModule} from 'app/app-routing.module';
import { AuthService} from 'app/shared/services/auth.service';
import { AuthGuard} from 'app/shared/services/auth.guard';
import { PageNotFoundComponent } from 'app/pages/page-not-found/page-not-found.component';
import { ToastService } from 'app/shared/toast.service';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { SpinnerService } from 'app/shared/services/spinner.service';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        PageNotFoundComponent,
        SpinnerComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        HttpClientModule,

        MaterialShared,

        AppRoutingModule
    ],
    providers: [
        AuthService,
        AuthGuard,
        ApplicationContext,
        SpinnerService,
        ToastService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
    entryComponents: [
        SpinnerComponent
    ],

    bootstrap: [AppComponent],
})
export class AppModule { }
