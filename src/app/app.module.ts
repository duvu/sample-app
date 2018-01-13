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
import { ProgressBarService} from 'app/shared/services/progress-bar.service';
import { AppService} from 'app/shared/services/app.service';
import { AppComponent } from 'app/app.component';
import { AppRoutingModule} from 'app/app-routing.module';
import { AuthService} from 'app/shared/services/auth.service';
import { AuthGuard} from 'app/shared/services/auth.guard';
import { PageNotFoundComponent } from 'app/pages/page-not-found/page-not-found.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        PageNotFoundComponent,
        PageHomeComponent
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
        AppService,
        ProgressBarService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],

    bootstrap: [AppComponent],
})
export class AppModule { }
