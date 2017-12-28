import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AppService } from 'app/services/app.service';

@Directive({
  selector: '[appIsAdmin]'
})
export class IsAdminDirective implements OnInit {
    condition: boolean;

    constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef,
              private appService: AppService
              ) { }
    @Input() set appIsAdmin(condition: boolean) {
        this.condition = condition;
    }
    ngOnInit(): void {
        this.appService.currentUser.subscribe(currentUser => {
            console.log("###", currentUser)
        })
    }
}
