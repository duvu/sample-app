/**
 * Created by beou on 3/30/17.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import {AuthGuard} from "app/services/auth.guard";
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";
import {LoginComponent} from "./login/login.component";
import { ErrorComponent } from 'app/pages/error/error.component';


const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: 'login',    component: LoginComponent },
    { path: 'main',     loadChildren: 'app/main/main.module#MainModule', canActivate: [AuthGuard], canActivateChild: [AuthGuard] },
    { path: 'error',    pathMatch: 'full', component: ErrorComponent },
    { path: '**',       pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
