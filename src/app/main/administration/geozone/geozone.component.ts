import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-geozone',
    templateUrl: './geozone.component.html',
    styleUrls: ['./geozone.component.scss']
})
export class GeozoneComponent implements OnInit, AfterViewInit {

    // private customDefault: L.Icon;
    // private map: L.Map;


    constructor(private router: Router) { }

    ngOnInit() {
        // this.customDefault = L.icon({
        //     iconRetinaUrl: '/assets/images/marker-icon-2x.png',
        //     iconUrl: '/assets/images/marker-icon.png',
        //     shadowUrl: '/assets/images/marker-shadow.png'
        // });
    }

    ngAfterViewInit(): void {
        // console.log('afterView');
        // this.map = L.map('map-id', {
        //     zoomControl: false,
        //     center: L.latLng(21.731253, 105.996139),
        //     zoom: 12,
        //     minZoom: 1,
        //     maxZoom: 18,
        //
        //     layers: [
        //         L.tileLayer(TILE_MAPBOX, {
        //             attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>',
        //             id: 'mapbox.streets',
        //             accessToken: 'pk.eyJ1IjoiaG9haXZ1YmsiLCJhIjoiY2oya3YzbHFuMDAwMTJxazN6Y3k0Y2syNyJ9.4avYQphrtbrrniI_CT0XSA'
        //         })]
        // });
        // L.control.scale().addTo(this.map);
        // L.control.zoom().setPosition('bottomleft').addTo(this.map);

    }

}
