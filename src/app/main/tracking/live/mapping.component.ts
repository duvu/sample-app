import * as _ from 'lodash';
import * as d3 from 'd3';
import { Component, OnDestroy, OnInit, AfterViewInit} from '@angular/core';

import * as L from 'leaflet';
import 'leaflet.markercluster';
import { MarkerClusterGroup } from "leaflet";

import * as distanceInWordsToNow from 'date-fns/distance_in_words_to_now'


import {DeviceService} from 'app/shared/services/device.service';
import {EventService} from 'app/shared/services/event.service';
import {EventData} from 'app/shared/models/event-data';
import { TimerObservable } from 'rxjs/observable/TimerObservable';

import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/forkJoin';

import { StatusPieChart } from 'app/shared/models/status-pie-chart';
import { DeviceLittle } from 'app/shared/models/little/device-little';
import { PopupService } from 'app/main/tracking/live/popup/popup.service';
import { MappingUtils } from 'app/main/tracking/live/mapping-utils';
import { WaitingService } from 'app/shared/services/waiting.service';
import { Observable } from 'rxjs/Observable';
import { ToastService } from 'app/shared/toast.service';
import { CircleMarker } from 'leaflet';

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

    numberOfLoad: number = 0;
    markersCluster: MarkerClusterGroup;

    deviceList: DeviceLittle[];
    allDeviceList: DeviceLittle[];

    private alive: boolean;

    //-- chart
    private arc: any;
    private labelArc: any;
    private pie: any;
    private color: any;
    private svg: any;
    private stats: any;
    private totalDevice: number;

    private chart: any;
    private legend: any;
    private center: any;

    selectedDevice: DeviceLittle;
    selectedMarker: CircleMarker;

    foods = [
        {value: 'steak-0', viewValue: 'Steak'},
        {value: 'pizza-1', viewValue: 'Pizza'},
        {value: 'tacos-2', viewValue: 'Tacos'}
    ];

    constructor(private deviceService: DeviceService,
                private eventService: EventService,
                private spinner: WaitingService,
                private toast: ToastService,
                private popupLink: PopupService) { }

    ngOnInit() {
        this.alive = true;
        this.spinner.show(true);

        Observable.forkJoin(
            this.deviceService.getAllLittle(),
            this.eventService.getLiveEvents()
        ).subscribe(
            data => {
                this.allDeviceList = data[0];
                this.liveEvents = data[1];
            },
            error => {
                this.toast.error("Error when loading data");
            },
            () => {
                this.deviceList = _.filter(this.allDeviceList, (d) => {
                    return true;
                });
                this.spinner.show(false);
                this.processEvents();
            }
        );

        this.initOverviewPieChart();
    }

    ngAfterViewInit(): void {
        this.loadLivesEvent();
        this.customDefault = L.icon({
            iconRetinaUrl: '/assets/images/marker-icon-2x.png',
            iconUrl: '/assets/images/marker-icon.png',
            shadowUrl: '/assets/images/marker-shadow.png'
        });

        this.markersCluster = L.markerClusterGroup();


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

    }



    ngOnDestroy(): void {
        this.alive = false;
    }

    loadLivesEvent(): void {
        TimerObservable.create(20, 10 * 1000)
            .takeWhile(() => this.alive)
            .subscribe(() => {
                this.eventService.getLiveEvents().subscribe(
                    liveEvents => {
                        this.liveEvents = liveEvents;
                        this.numberOfLoad++;
                        this.processEvents();
                    },
                    error => {

                    },
                    () => {

                    }
                );
            });
    }

    processEvents(): void {
        let icon = this.customDefault;
        this.stats = [];
        let liveDev = new StatusPieChart(1,"Live", 0);
        let idleDev = new StatusPieChart(2,"Idle", 0);
        let stopDev = new StatusPieChart(3,"Stop", 0);
        let deadDev = new StatusPieChart(3,"Dead", 0);

        this.markersCluster.clearLayers();
        _.forEach(this.liveEvents, function (event) {
            let d = _.find(this.allDeviceList, function (dt) {
                return event.devId === dt.id;
            });

            d.address = event.address;
            d.latitude = event.latitude;
            d.longitude = event.longitude;
            d.lastUpdateTime = event.timestamp;
            d.speedKph = event.speedKPH;
            d.lastUpdateTimeInWords = distanceInWordsToNow(event.timestamp) + ' ago';

            if (event.latitude && event.longitude) {
                let marker = this.buildMarker(event);
                this.popupLink.register(marker, event);
                this.markersCluster.addLayer(marker);
                marker.on('click', () => {
                    this.selectedDevice = d;
                    //circle around marker
                    if (this.selectedMarker) {
                        this.selectedMarker.removeFrom(this.map);
                    }
                    let center = L.latLng(this.selectedDevice.latitude, this.selectedDevice.longitude);
                    this.selectedMarker = L.circleMarker(center, {radius: 30}).addTo(this.map);
                });
            }

            const status = MappingUtils.getStatus(event.timestamp);
            switch (status) {
                case 'live':
                    liveDev.increase();
                    d.state = 2; //living
                    break;
                case 'idle':
                    idleDev.increase();
                    d.state = 1; //idle
                    break;
                case 'stop':
                    stopDev.increase();
                    d.state = 0; //stop
                    break;
                case 'dead':
                    deadDev.increase();
                    d.state = -1;
                    break;
            }

        }.bind(this));

        if (this.selectedDevice) {
            let center = L.latLng(this.selectedDevice.latitude, this.selectedDevice.longitude);
            let oldZoom = this.map.getZoom();
            this.map.setView(center, oldZoom);

            //circle around marker
            if (this.selectedMarker) {
                this.selectedMarker.removeFrom(this.map);
            }
            this.selectedMarker = L.circleMarker(center, {radius: 30}).addTo(this.map);
        } else if (this.liveEvents.length > 0 ) {
            this.map.addLayer(this.markersCluster);
            if (this.numberOfLoad <= 1) {
                this.map.fitBounds(this.markersCluster.getBounds());
            }

            if (this.selectedMarker) {
                this.selectedMarker.removeFrom(this.map);
            }

        }
        this.totalDevice = this.liveEvents.length;
        this.stats.push(liveDev, idleDev, stopDev, deadDev);
        this.draw();
    }

    buildMarker(event: EventData): L.Marker {
        let ll = L.latLng(event.latitude, event.longitude);
        let icon = this.buildIcon(event);
        let popup = this.buildPopup(event);


        let devName = event.deviceName ? event.deviceName : event.deviceId;

        let m = L.marker(ll, {icon: icon})
            .bindTooltip(devName, {
                permanent: true,
                direction: 'bottom',
                offset: L.point(0, 6),
                opacity: 1,
                className: 'marker-label'
            }).bindPopup(popup);
        return m;
    }

    buildIcon(event: EventData): L.DivIcon {
        let htmlIcon = '';
        htmlIcon = '<div style="background-color:' + MappingUtils.getColor(event.timestamp) + '; width: 100%; height: 100%;"></div>';
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
        popup.setContent(document.createElement('div'));
        popup.options.offset = L.point(0, 0);

        return popup;
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        this.deviceList = _.filter(this.allDeviceList, (dev: DeviceLittle) => {
            return (dev.name && _.includes(dev.name, filterValue)) ||
                (dev.deviceId && _.includes(dev.deviceId, filterValue)) ||
                (dev.address && _.includes(dev.address, filterValue));
        });
    }

    selectThisDevice(event: any, device: DeviceLittle): void {
        event.stopPropagation();
        if (this.selectedDevice) {
            this.selectedDevice.selected = false;
        }
        device.selected = !device.selected;

        let center = L.latLng(device.latitude, device.longitude);
        this.map.setView(center, 15);

        this.selectedDevice = device;
        //circle around marker
        if (this.selectedMarker) {
            this.selectedMarker.removeFrom(this.map);
        }
        this.selectedMarker = L.circleMarker(center, {radius: 30}).addTo(this.map);
    }

    closePanelDetails() {
        this.selectedDevice = null;
        setTimeout(() => {
            this.map.invalidateSize(true);
        }, 0);
    }

    stopPropagation(event: Event) {
        event.stopPropagation();
    }

    openDialogSendCommand(event: Event) {
        event.stopPropagation();
    }

    requestLocationUpdate(event: Event) {
        event.stopPropagation();
    }

    initOverviewPieChart(): void {
        this.color = d3.scaleOrdinal()
            .range(MappingUtils.COLOR_SCHEME);

        this.arc = d3.arc()
            .outerRadius(56)
            .innerRadius(28);
        this.labelArc = d3.arc()
            .outerRadius(45)
            .innerRadius(35);
        this.pie = d3.pie()
            .sort(null)
            .value((d: any) => d.count);
        this.svg = d3.select("svg")
            .append("g")
            .attr("transform", "translate(" + 65 + "," + 60 + ")");
    }

    private draw() {
        if (this.chart) {
            this.updatePie();
        } else {
            this.createPie();
        }
    }

    private createPie() {
        console.log('creating');
        this.legend = this.svg.selectAll('.legend')
            .data(this.pie(this.stats))
            .enter().append('g')
            .attr('transform', (d, i) => {return 'translate(' + (75) + ',' + (i * 20 - 30) + ')';})
            .attr('class', 'legend')

        this.legend.append('rect')
            .attr('width', 10)
            .attr('height', 10)
            .style('fill', (d, i) => {
                return this.color(i);
            });
        this.legend.append('text')
            .text((d, i) => {
                return d.data.name;
            })
            .attr('font-size', '0.9em')
            .attr('y', 10)
            .attr('x', 15);

        this.center = this.svg
            .append("text")
            .attr("text-anchor", "middle")
            .attr('font-size', '1.25em')
            .attr('y', 10)
            .text(this.totalDevice);


        this.chart = this.svg.selectAll(".arc")
            .data(this.pie(this.stats))
            .enter().append("g")
            .attr("class", "arc");

        this.chart.append("path")
            .attr("d", this.arc)
            .attr("fill", (d: any, i: number) => {
                return this.color(i)
            });

        this.chart.append("text").attr("transform", (d: any) => "translate(" + this.labelArc.centroid(d) + ")")
            .attr("dy", ".5em")
            .attr('font-size', '0.7em')
            .text((d: any) => (d.data.count > 0 ? d.data.count : ''));


    }

    private updatePie() {
        this.center.select('text').text(() => this.totalDevice);
        this.chart.data(this.pie(this.stats));
        this.chart.select("path")
            .attr("d", this.arc);
        this.chart.select("text")
            .attr("transform", (d: any) => "translate(" + this.labelArc.centroid(d) + ")")
            .text((d: any) => (d.data.count > 0 ? d.data.count : ''));
    }

    //--
    // private width: number;
    // private height: number;
    // private initSpeedLineChart() {
    //     let parentDiv = document.getElementById('speed-chart');
    //     this.width = parentDiv.clientWidth;
    //     this.height = parentDiv.clientHeight;
    // }
}
