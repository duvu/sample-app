import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/services/auth.guard';
import { MailComponent } from 'app/main/mail/mail.component';


const routes: Routes = [
    {
        path: '',
        component: MailComponent,
        children: [
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MailRoutingModule { }
