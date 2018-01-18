import * as L from 'leaflet';
import { ApplicationRef, Component, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { LeafletMouseEvent } from 'leaflet';

@Injectable()
export class LinkPopupService {
    constructor(private cfr: ComponentFactoryResolver,
                private injector: Injector,
                private appRef: ApplicationRef) { }


    register(marker: L.Marker, link: string): void  {
        marker.on('click', ($event: L.LeafletMouseEvent)  => this.popup($event.target, link) );
    }

    popup(marker: L.Marker, link: string) {
        const cmpFactory = this.cfr.resolveComponentFactory(FacilityLinkComponent);
        const componentRef = cmpFactory.create(this.injector);
        componentRef.instance.link = link;
        this.appRef.attachView(componentRef.hostView);
        const markerElement = marker.getElement();
        markerElement.parentElement.appendChild(componentRef.location.nativeElement);

        const markerPos = L.DomUtil.getPosition(markerElement);
        const markerClass = L.DomUtil.getClass(markerElement);


        L.DomUtil.setTransform(componentRef.location.nativeElement, markerPos);
        L.DomUtil.setClass(componentRef.location.nativeElement, markerClass);
    }
}

@Component({
    selector: 'facility-link',
    template: `Facility <br/> <a routerLink="{{link}}"> View Two</a>`
})
export class FacilityLinkComponent {
    public link: string;
    constructor() { }
}