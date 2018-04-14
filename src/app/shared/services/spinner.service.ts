import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { ComponentPortal, DomPortalHost } from '@angular/cdk/portal';
import { SpinnerComponent } from 'app/shared/components/spinner/spinner.component';

@Injectable()
export class SpinnerService {
    private holderPortal: ComponentPortal<SpinnerComponent>;
    private bodyPortal: DomPortalHost;

    constructor(
        private factoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector
    ) {
        this.holderPortal = new ComponentPortal<SpinnerComponent>(SpinnerComponent);
        this.bodyPortal = new DomPortalHost(
            document.body,
            this.factoryResolver,
            this.appRef,
            this.injector
        )
    }

    show(shouldShow: boolean) {
        if (shouldShow) {
            this.bodyPortal.attach(this.holderPortal);
        } else {
            this.bodyPortal.detach();
        }
    }
}