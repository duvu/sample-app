import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';

import * as L from 'leaflet';
import 'leaflet.markercluster';

import {DeviceService} from '../../services/device.service';
import {EventService} from '../../services/event.service';
import {EventData} from '../../shared/models/event-data';
import * as _ from 'lodash';
// import PointExpression = L.PointExpression;
import {DatePipe} from '@angular/common';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/mergeMap';
import { MatTableDataSource } from '@angular/material';
import { Device } from 'app/shared/models/device';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import 'rxjs/add/operator/takeWhile';
const TILE_OSM = 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
const TILE_MAPBOX = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';

@Component({
    selector: 'app-mapping',
    templateUrl: './mapping.component.html',
    styleUrls: ['./mapping.component.scss']
})
export class MappingComponent implements OnInit, OnDestroy, AfterViewInit {
    liveEvents: EventData[];
    customDefault: L.Icon;
    map: L.Map;

    isLoading: boolean = true;
    numberOfLoad: number = 0;

    selectedEvent: EventData = null;
    inputSearch: string = null;
    subcription: any;

    displayedColumns = ['name'];
    dataSource: MatTableDataSource<Device> | null;

    private alive: boolean;

    constructor(private _datePipe: DatePipe ,private _device_service: DeviceService, private _event_service: EventService) { }

    ngOnInit() {
        this.customDefault = L.icon({
            iconRetinaUrl: '/assets/images/marker-icon-2x.png',
            iconUrl: '/assets/images/marker-icon.png',
            shadowUrl: '/assets/images/marker-shadow.png'
        });
        this.alive = true;
        this.dataSource = new MatTableDataSource();

        this._device_service.getAll().subscribe(
            response => {
                this.dataSource.data = response;
            },
            error => {},
            () => {}
        );

    }
    ngAfterViewInit(): void {
        this.map = L.map('map-id', {
            zoomControl: false,
            center: L.latLng(21.731253, 105.996139),
            zoom: 12,
            minZoom: 1,
            maxZoom: 19,

            layers: [
                L.tileLayer(TILE_MAPBOX, {
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>',
                    id: 'mapbox.streets',
                    accessToken: 'pk.eyJ1IjoiaG9haXZ1YmsiLCJhIjoiY2oya3YzbHFuMDAwMTJxazN6Y3k0Y2syNyJ9.4avYQphrtbrrniI_CT0XSA'
                })]
        });

        L.control.scale().addTo(this.map);
        L.control.zoom().setPosition('bottomleft').addTo(this.map);
        this.loadLivesEvent();
    }
    ngOnDestroy(): void {
        this.alive = false;
    }
    loadLivesEvent(): void {
        TimerObservable.create(0, 10000)
            .takeWhile(() => this.alive)
            .subscribe(() => {
                this._event_service.getLiveEvents().subscribe(
                    liveEvents => {
                        this.liveEvents = liveEvents;
                        this.isLoading = false;
                        this.numberOfLoad++;
                        this.processEvents();
                    },
                    error => {},
                    () => {}
                );
            });
    }
    processEvents(): void {
        let icon = this.customDefault;
        let markersCluster = L.markerClusterGroup();
        let latlngArray = [];
        _.forEach(this.liveEvents, function (event) {
            if (event.latitude && event.longitude) {
                let marker = this.buildMarker(event);
                let ll = L.latLng(event.latitude, event.longitude);
                markersCluster.addLayer(marker);
                latlngArray.push(ll);
            }
        }.bind(this));

        let bounds = L.latLngBounds(latlngArray);
        this.map.addLayer(markersCluster);
        if (this.numberOfLoad <= 1 && latlngArray.length > 0) {
            this.map.fitBounds(bounds);
        }
    }

    buildMarker(event: EventData): L.Marker {
        let ll = L.latLng(event.latitude, event.longitude);
        let icon = this.buildIcon(event);
        let popup = this.buildPopup(event);
        return L.marker(ll, {icon: icon})
            .bindTooltip(event.displayName, {
                permanent: true,
                direction: 'bottom',
                offset: L.point(0, 6),
                opacity: 1,
                className: 'marker-label'
            }).bindPopup(popup);
    }

    buildIcon(event: EventData): L.DivIcon {

        let htmlIcon = '';

        // html?: string | false;
        // bgPos?: PointExpression;
        // iconSize?: PointExpression;
        // iconAnchor?: PointExpression;
        // popupAnchor?: PointExpression;
        // className?: string;
        return L.divIcon({
            html: htmlIcon
        });
    }

    buildPopup(event: EventData): L.Popup {
        let popup = L.popup();
        let htmlPopup = '';

        let txtDate = this._datePipe.transform(event.timestamp, 'MMM dd, yyyy hh:mm:ss');
        htmlPopup += '<table>';
        htmlPopup += '<tr>'; htmlPopup += '<td class="popup-title">';htmlPopup += 'DeviceID:'; htmlPopup += '</td>';htmlPopup += '<td>';htmlPopup += event.deviceId;htmlPopup += '</td>';htmlPopup += '</tr>';
        htmlPopup += '<tr>'; htmlPopup += '<td class="popup-title">';htmlPopup += 'Time:'; htmlPopup += '</td>';htmlPopup += '<td>';htmlPopup += txtDate;htmlPopup += '</td>';htmlPopup += '</tr>';
        htmlPopup += '<tr>'; htmlPopup += '<td class="popup-title">';htmlPopup += 'Lat/Lng:'; htmlPopup += '</td>';htmlPopup += '<td>';htmlPopup += event.latitude + '/' + event.longitude;htmlPopup += '</td>';htmlPopup += '</tr>';
        htmlPopup += '<tr>'; htmlPopup += '<td class="popup-title">';htmlPopup += 'Address:'; htmlPopup += '</td>';htmlPopup += '<td>';htmlPopup += event.address;htmlPopup += '</td>';htmlPopup += '</tr>';
        htmlPopup += '</table>';
        popup.setContent(htmlPopup);
        popup.options.offset = L.point(0, 0);

        return popup;
    }
    clearSearch(): void {
        this.inputSearch = null;
        this.selectedEvent = null;
    }
    clearSelected() {
        this.selectedEvent = null;
    }
    selectAnEvent(event: EventData): void{
        this.selectedEvent = event;
        this.inputSearch = event.displayName;
        let center = L.latLng(event.latitude, event.longitude);
        this.map.setView(center, 15);
    }
}
