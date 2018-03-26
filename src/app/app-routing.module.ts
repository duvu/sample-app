/**
 * Created by beou on 3/30/17.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import {AuthGuard} from "./shared/services/auth.guard";
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";
import {LoginComponent} from "./login/login.component";


const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    { path: 'main', loadChildren: 'app/main/main.module#MainModule', canActivate: [AuthGuard], canActivateChild: [AuthGuard] },
    { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
