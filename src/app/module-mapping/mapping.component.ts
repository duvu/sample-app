import { Component, OnInit } from '@angular/core';

import 'leaflet';
import 'leaflet.markercluster';

import {Device} from "../models/Device";
import {DeviceService} from "../services/device.service";
import {EventService} from "../services/event.service";
import {EventData} from "../models/EventData";
import * as _ from 'lodash';
import map = L.map;
// import MarkerCluster = L.MarkerCluster;
// import MarkerClusterGroup = L.MarkerClusterGroup;

const TILE_OSM = "http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png";

@Component({
    selector: 'app-mapping',
    templateUrl: './mapping.component.html',
    styleUrls: ['./mapping.component.scss']
})
export class MappingComponent implements OnInit {
    liveEvents: EventData[];
    customDefault: L.Icon;
    map: L.Map;
    markersCluster: L.MarkerClusterGroup;
    constructor(private _device_service: DeviceService, private _event_service: EventService) { }

    ngOnInit() {
        this.customDefault = L.icon({
            iconRetinaUrl: '/assets/images/marker-icon-2x.png',
            iconUrl: '/assets/images/marker-icon.png',
            shadowUrl: '/assets/images/marker-shadow.png',
        })
        this.map = L.map("mapid", {
            zoomControl: false,
            center: L.latLng(21.731253, 105.996139),
            zoom: 12,
            minZoom: 1,
            maxZoom: 19,
            layers: [
                L.tileLayer(TILE_OSM, {
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
                })]
        });

        L.control.zoom({ position: "topright" }).addTo(this.map);
        L.control.scale().addTo(this.map);
        this.loadLivesEvent(this.map);
    }

    loadLivesEvent(map): void {
        this._event_service.getLiveEvents().subscribe(
            liveEvents => {
                this.liveEvents = liveEvents;
                this.processEvents();
            },
            error => {},
            () => {}
        )
    }
    processEvents(): void {
        let icon = this.customDefault;
        let markersCluster = L.markerClusterGroup();
        let latlngArray = [];
        _.forEach(this.liveEvents, function (event) {
            if (event.latitude && event.longitude) {
                let ll = L.latLng(event.latitude, event.longitude);
                let hIcon = '<div>'+ event.displayName +'</div>';
                let dIcon = L.divIcon({
                    html: hIcon
                });
                let marker = L.marker(ll, {icon: dIcon})/*
                    .bindTooltip(event.deviceID, {
                        permanent: true
                    })*/;
                markersCluster.addLayer(marker);
                latlngArray.push(ll);
            }
        });

        let bounds = L.latLngBounds(latlngArray);
        this.map.addLayer(markersCluster);
        this.map.fitBounds(bounds);
    }

    moveToMarker(event: EventData): void{
        console.log("Device", event);
        let center = L.latLng(event.latitude, event.longitude);
        this.map.setView(center, 15);
    }
}
