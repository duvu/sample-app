import * as _ from 'lodash';
import * as d3 from 'd3';
import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';

import * as L from 'leaflet';
import 'leaflet.markercluster';

import {DeviceService} from 'app/shared/services/device.service';
import {EventService} from 'app/shared/services/event.service';
import {EventData} from 'app/shared/models/event-data';
import {DatePipe} from '@angular/common';
import { MatTableDataSource } from '@angular/material';
import { Device } from 'app/shared/models/device';
import { TimerObservable } from 'rxjs/observable/TimerObservable';

import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/mergeMap';
import { MarkerClusterGroup } from "leaflet";
import { LatLngBounds } from 'leaflet';


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
    markersCluster: MarkerClusterGroup;
    bounds: LatLngBounds;

    selectedEvent: EventData = null;
    inputSearch: string = null;

    displayedColumns = ['name'];
    dataSource: MatTableDataSource<Device> | null;

    private alive: boolean;

    //-- chart
    private arc: any;
    private labelArc: any;
    private pie: any;
    private color: any;
    private svg: any;

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

        this.markersCluster = L.markerClusterGroup();
        this.initSvg();

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
                        this.drawPie();
                    },
                    error => {},
                    () => {

                    }
                );
            });
    }

    processEvents(): void {
        let icon = this.customDefault;
        this.markersCluster.clearLayers()
        _.forEach(this.liveEvents, function (event) {
            if (event.latitude && event.longitude) {
                let marker = this.buildMarker(event);
                this.markersCluster.addLayer(marker);
            }
        }.bind(this));

        this.bounds = this.markersCluster.getBounds();//L.latLngBounds(latlngArray);
        this.map.addLayer(this.markersCluster);
        if (this.numberOfLoad <= 1) {
            this.map.fitBounds(this.bounds);
        }
    }

    buildMarker(event: EventData): L.Marker {
        let ll = L.latLng(event.latitude, event.longitude);
        let icon = this.buildIcon(event);
        let popup = this.buildPopup(event);
        return L.marker(ll, {icon: icon})
            .bindTooltip(event.deviceName, {
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
        this.inputSearch = event.deviceName;
        let center = L.latLng(event.latitude, event.longitude);
        this.map.setView(center, 15);
    }


    selectThisDevice(device: Device): void {
        device.selected = !device.selected;
        let evdt = _.find(this.liveEvents, function (e) {
            return device.id === e.devId;
        });


        let center = L.latLng(evdt.latitude, evdt.longitude);
        this.map.setView(center, 15);
    }

    initSvg(): void {
        this.color = d3.scaleOrdinal()
            .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
        this.arc = d3.arc()
            .outerRadius(115)
            .innerRadius(0);
        this.labelArc = d3.arc()
            .outerRadius(75)
            .innerRadius(75);
        this.pie = d3.pie()
            .sort(null)
            .value((d: any) => d.population);
        this.svg = d3.select("svg")
            .append("g")
            .attr("transform", "translate(" + 125 + "," + 125 + ")");
    }

    private drawPie() {

        let Stats = [
            {age: "<5", population: 2704659},
            {age: "5-13", population: 4499890},
            {age: "14-17", population: 2159981},
            {age: "18-24", population: 3853788},
            {age: "25-44", population: 14106543},
            {age: "45-64", population: 8819342},
            {age: "≥65", population: 612463}
        ];
        let g = this.svg.selectAll(".arc")
            .data(this.pie(Stats))
            .enter().append("g")
            .attr("class", "arc");
        g.append("path").attr("d", this.arc)
            .style("fill", (d: any) => this.color(d.data.age) );
        g.append("text").attr("transform", (d: any) => "translate(" + this.labelArc.centroid(d) + ")")
            .attr("dy", ".35em")
            .text((d: any) => d.data.age);
    }
}
