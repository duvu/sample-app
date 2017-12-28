import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AppService } from 'app/services/app.service';

import * as _ from 'lodash';

@Directive({
  selector: '[showIfRole]'
})
export class ShowIfRoleDirective implements OnInit {

    private _roles: string;
    private hasView = false;
    constructor(private templateRef: TemplateRef<any>,
                private viewContainer: ViewContainerRef,
                private appService: AppService
    ) { }

    @Input() set showIfRole(roles: string) {
        this._roles = roles;
    }
    ngOnInit(): void {
        this.appService.currentUser.subscribe(currentUser => {
            console.log("###", currentUser);
            if (!currentUser) return;
            if (_.includes(currentUser.authorities, this._roles) && !this.hasView) {
                this.viewContainer.createEmbeddedView(this.templateRef);
                this.hasView = true;
            } else if (!_.includes(currentUser.authorities, this._roles) && this.hasView) {
                this.viewContainer.clear();
                this.hasView = false;
            }
        })
    }
}
