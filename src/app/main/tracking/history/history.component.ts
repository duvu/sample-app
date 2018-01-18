import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import * as L from 'leaflet';
import 'leaflet-polylinedecorator';
//import 'leaflet.markercluster';
import { EventService } from 'app/shared/services/event.service';
import { EventData } from 'app/shared/models/event-data';

import * as _ from 'lodash';
import { LatLngBounds } from 'leaflet';
import { LatLng } from 'leaflet';


const TILE_OSM = 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
const TILE_MAPBOX = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';


@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, AfterViewInit {

    private id: string;
    private map: L.Map;
    private historyEvents: EventData[];
    private customDefault: L.Icon;
    private bounds: LatLngBounds;

    constructor(private route: ActivatedRoute,
                private eventService: EventService) { }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.customDefault = L.icon({
            iconRetinaUrl: '/assets/images/marker-icon-2x.png',
            iconUrl: '/assets/images/marker-icon.png',
            shadowUrl: '/assets/images/marker-shadow.png'
        });
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
        this.loadHistoryEvents();
    }

    private loadHistoryEvents(): void {
        this.eventService.getHistoryEvents(this.id, 0, 0).subscribe(
            data => {
                //console.log('Data', data);
                this.historyEvents = data;
                this.processEvents();

            },
            error => {},
            () => {}
        )
    }

    private processEvents(): void {
        // _.forEach(this.historyEvents, function (event) {
        //     L.marker([event.latitude, event.longitude], {icon: this.customDefault}).addTo(this.map);
        // }.bind(this));
        let latlngs = _.map(this.historyEvents, (event) => {
           return new LatLng(event.latitude, event.longitude);
        });

        console.log('LL', latlngs);
        let polyline = L.polyline(latlngs, {color: 'red'}).addTo(this.map);
        this.map.fitBounds(polyline.getBounds());

        let decor = L.polylineDecorator(polyline, {
            patterns: [
                {offset: 25, repeat: 50, symbol: L.Symbol.arrowHead({pixelSize: 15, pathOptions: {fillOpacity: 1, weight: 0}})}
            ]
        }).addTo(this.map);
    }
}
