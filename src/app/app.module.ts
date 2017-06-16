import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, RequestOptions, Http} from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { AppRoutingModule} from "./app-routing.module";
import { AuthService} from "./services/auth/auth.service";
import { AuthGuard} from "./guards/auth.guard";
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { MdButtonModule, MdIconModule, MdToolbarModule, MdProgressSpinnerModule, MdInputModule} from "@angular/material";
import { CommonModule} from "@angular/common";
import { LoginComponent} from "./pages/login/login.component";
import { AuthModule } from "./auth.module";

import 'hammerjs';

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
        FlexLayoutModule,
        FormsModule,
        HttpModule,
        //-- Material
        MdButtonModule,
        MdIconModule,
        MdInputModule,
        MdToolbarModule,
        MdProgressSpinnerModule,
        //-- Routing
        AppRoutingModule,
        //-- AuthModule
        AuthModule
    ],
    providers: [
        AuthService,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
