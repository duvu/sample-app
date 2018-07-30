import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailComponent } from './mail.component';
import { MailRoutingModule } from 'app/main/mail/mail-routing.module';

@NgModule({
    imports: [
        CommonModule,
        MailRoutingModule
    ],
    declarations: [MailComponent]
})
export class MailModule { }
