import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule} from "./app-routing.module";
import { AuthService} from "./services/auth/auth.service";
import { AuthGuard} from "./services/guards/auth.guard";
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { CommonModule} from "@angular/common";
import { LoginComponent} from "./login/login.component";

import 'hammerjs';
import {MaterialShared} from "./shared/material-shared";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./services/auth-interceptor";
import {ProgressBarService} from "./services/progress-bar.service";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        HttpModule,
        HttpClientModule,

        MaterialShared,

        AppRoutingModule
    ],
    providers: [
        AuthService,
        AuthGuard,
        ProgressBarService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
