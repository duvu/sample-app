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
            console.log("###", this._roles);
            if (_.includes(this._roles, "admin") && !this.hasView) {
                this.viewContainer.createEmbeddedView(this.templateRef);
                this.hasView = true;

                console.log("###", this._roles);
            } else if (!_.includes(this._roles, "admin") && this.hasView) {
                this.viewContainer.clear();
                this.hasView = false;
            }
        })
    }
}
