import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { ApplicationContext } from 'app/shared/services/application-context.service';

import * as _ from 'lodash';

@Directive({
  selector: '[showIfRole]'
})
export class ShowIfRoleDirective implements OnInit {

    private _roles: string;
    private hasView = false;
    constructor(private templateRef: TemplateRef<any>,
                private viewContainer: ViewContainerRef,
                private appService: ApplicationContext
    ) { }

    @Input() set showIfRole(roles: string) {
        this._roles = roles;
    }
    ngOnInit(): void {
        this.appService.currentUser.subscribe(currentUser => {
            if (!currentUser) return;
            if (this.isContainRole(currentUser.authorities, this._roles) && !this.hasView) {
                this.viewContainer.createEmbeddedView(this.templateRef);
                this.hasView = true;
            } else if (!this.isContainRole(currentUser.authorities, this._roles) && this.hasView) {
                this.viewContainer.clear();
                this.hasView = false;
            }
        })
    }

    isContainRole(authorities: string[], roles: string): boolean {
        let rolesArray = _.split(this._roles, ',');

        if (rolesArray && rolesArray.length > 0) {
            for (let i = 0; i < rolesArray.length; i++) {
                let role = ShowIfRoleDirective.nomalize(rolesArray[i]);
                if (_.includes(authorities, role)) {
                    return true;
                }
            }
        }
        return false;
    }

    static nomalize(role: string): string {
        //0. snakeCase
        role = _.snakeCase(role);
        //1. toUpper
        role = _.toUpper(role);
        //2. check startWith ROLE_
        if (_.startsWith(role, 'ROLE_')) {
            return role;
        } else {
            return 'ROLE_' + role;
        }
    }
}
