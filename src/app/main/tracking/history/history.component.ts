import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import * as L from 'leaflet';
//import 'leaflet.markercluster';


const TILE_OSM = 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
const TILE_MAPBOX = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';


@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, AfterViewInit {

    private id: string;
    map: L.Map;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
    }
    ngAfterViewInit(): void {
        console.log('afterView');
        this.map = L.map('map-id', {
            zoomControl: false,
            center: L.latLng(21.731253, 105.996139),
            zoom: 12,
            minZoom: 1,
            maxZoom: 18,

            layers: [
                L.tileLayer(TILE_MAPBOX, {
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>',
                    id: 'mapbox.streets',
                    accessToken: 'pk.eyJ1IjoiaG9haXZ1YmsiLCJhIjoiY2oya3YzbHFuMDAwMTJxazN6Y3k0Y2syNyJ9.4avYQphrtbrrniI_CT0XSA'
                })]
        });

        L.control.scale().addTo(this.map);
        L.control.zoom().setPosition('bottomleft').addTo(this.map);
        //this.loadLivesEvent();
    }
}
