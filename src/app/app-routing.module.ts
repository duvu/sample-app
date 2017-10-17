/**
 * Created by beou on 3/30/17.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from "./services/auth.guard";
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";
import {LoginComponent} from "./login/login.component";


const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    { path: 'main', loadChildren: 'app/main/main.module#MainModule', canActivate: [AuthGuard], canActivateChild: [AuthGuard] },
    { path: '*', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
