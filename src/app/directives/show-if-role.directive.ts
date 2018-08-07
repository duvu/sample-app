import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { ApplicationContext } from 'app/application-context';

import * as _ from 'lodash';

@Directive({
  selector: '[showIfRole]'
})
export class ShowIfRoleDirective implements OnInit {

    private _roles: string;
    private hasView = false;
    constructor(private templateRef: TemplateRef<any>,
                private viewContainer: ViewContainerRef,
                private applicationContext: ApplicationContext
    ) { }

    @Input() set showIfRole(roles: string) {
        this._roles = roles;
    }

    ngOnInit(): void {
        if (this.isContainRole(this.applicationContext.authorities, this._roles) && !this.hasView) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.hasView = true;
        } else if (!this.isContainRole(this.applicationContext.authorities, this._roles) && this.hasView) {
            this.viewContainer.clear();
            this.hasView = false;
        }

    }

    isContainRole(authorities: string[], roles: string): boolean {

        let rolesArray = _.split(roles, ',');

        if (rolesArray && rolesArray.length > 0) {
            for (let i = 0; i < rolesArray.length; i++) {
                let role = ShowIfRoleDirective.normalize(rolesArray[i]);
                console.log('isContainRole: ', role);
                if (_.includes(authorities, role)) {
                    return true;
                }
            }
        }
        return false;
    }

    static normalize(role: string): string {
        //1. toUpper
        return _.toUpper(role);
    }
}
