import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import * as L from 'leaflet';
import 'leaflet-polylinedecorator';
import 'leaflet-easybutton';

import { EventService } from 'app/shared/services/event.service';
import { EventData } from 'app/shared/models/event-data';

import * as _ from 'lodash';
import { LatLng, Polyline } from 'leaflet';
import { MatTableDataSource } from '@angular/material';

import * as d3 from 'd3';
import * as c3 from 'c3';

import { WaitingService } from 'app/shared/services/waiting.service';
import { SelectionModel } from '@angular/cdk/collections';

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
    private selectedMarker: L.Marker;
    private historyEvents: EventData[];

    private historyEventsOptimizeForChart: EventData[];
    private timestampCol: Array<any> = ['timestamp'];
    private speedKphCol: Array<any> = ['SpeedKPH'];
    private fuelLevelCol: Array<any> = ['FuelLevel'];

    private polyline: Polyline;
    private decor: any;
    private timeFrom: number;
    private timeTo: number;

    private name: string;

    private iconDefault: L.Icon;

    dataSource: MatTableDataSource<EventData> | null;
    displayedColumns = ['latitude', 'longitude', 'heading', 'speedKPH', 'address', 'timestamp', 'age'];
    selection = new SelectionModel<EventData>(true, []);

    //charting
    private width: number;
    private height: number;
    private x: any;
    private y: any;
    private svg: any;
    private chart: any;
    private line: d3.Line<any>;
    private xAxis: any;
    private yAxis: any;

    private update: boolean = false;

    constructor(private route: ActivatedRoute,
                private eventService: EventService,
                private waitingService: WaitingService) {

    }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.iconDefault = L.icon({
            iconRetinaUrl: '/assets/images/marker-icon-2x.png',
            iconUrl: '/assets/images/marker-icon.png',
            shadowUrl: '/assets/images/marker-shadow.png',
            iconAnchor: [12.5, 41]
        });

        this.dataSource = new MatTableDataSource();
        this.timeFrom = this.timeFrom ? this.timeFrom : 0;
        this.timeTo = this.timeTo ? this.timeTo : 0;
        this.loadHistoryEvents();

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

        let range = [];

        let range1h = L.easyButton('<span>1h</span>', function (button, map) {
            this.timeTo = (new Date()).getTime();
            this.timeFrom = this.timeTo - 60 * 60 * 1000;
            this.loadHistoryEvents();
        }.bind(this));

        let range2h = L.easyButton('<span>2h</span>', function () {
            this.timeTo = (new Date()).getTime();
            this.timeFrom = this.timeTo - 2 * 60 * 60 * 1000;
            this.loadHistoryEvents();
        }.bind(this));
        let range6h = L.easyButton('<span>6h</span>', function () {
            this.timeTo = (new Date()).getTime();
            this.timeFrom = this.timeTo - 6 * 60 * 60 * 1000;
            this.loadHistoryEvents();
        }.bind(this));
        let range12h = L.easyButton('<span>12h</span>', function () {
            this.timeTo = (new Date()).getTime();
            this.timeFrom = this.timeTo - 12 * 60 * 60 * 1000;
            this.loadHistoryEvents();
        }.bind(this));

        let range1d = L.easyButton('<span>1d</span>', function () {
            this.timeTo = (new Date()).getTime();
            this.timeFrom = this.timeTo - 24 * 60 * 60 * 1000;
            this.loadHistoryEvents();
        }.bind(this));
        let range3d = L.easyButton('<span>3d</span>', function () {
            this.timeTo = (new Date()).getTime();
            this.timeFrom = this.timeTo - 72 * 60 * 60 * 1000;
            this.loadHistoryEvents();
        }.bind(this));

        let range1w = L.easyButton('<span>1w</span>', function () {
            this.timeTo = (new Date()).getTime();
            this.timeFrom = this.timeTo - 7 * 24* 60 * 60 * 1000;
            this.loadHistoryEvents();
        }.bind(this));
        let range1m = L.easyButton('<span>1m</span>', function () {
            this.timeTo = (new Date()).getTime();
            this.timeFrom = this.timeTo - 30 * 24* 60 * 60 * 1000;
            this.loadHistoryEvents();
        }.bind(this));

        range.push(range1h, range2h, range6h, range12h, range1d, range3d, range1w, range1m);

        L.easyBar(range).addTo(this.map);

        //this.initSvg();
    }

    private loadHistoryEvents(): void {
        this.waitingService.show(true);
        this.eventService.getHistoryEvents(this.id, this.timeFrom, this.timeTo).subscribe(
            data => {
                this.historyEvents = data;

                let h = _.head(data);
                let l = _.last(data);
                if (h && l) {
                    h.timestamp -= 1;
                    h.speedKPH=0;
                    l.timestamp+=1;
                    l.speedKPH=0;
                    this.historyEventsOptimizeForChart = _.concat(h, data, l);
                    this.name = h.deviceName || h.deviceId;
                } else {
                    this.historyEventsOptimizeForChart = data;
                }


                this.dataSource.data = data;
                let ahead = (new Date()).getTime();
                _.forEach(this.dataSource.data, (d: EventData) => {
                    //--
                    d.age = ahead - d.timestamp;
                    ahead = d.timestamp;
                });
                this.processEvents();
            },
            error => {
                this.waitingService.show(false);
            },
            () => {
                this.waitingService.show(false);
                this.draw();
            }
        )
    }

    select(row: EventData): void {
        console.log('Data Row', row);
        if (this.selectedMarker) {
            this.map.removeLayer(this.selectedMarker);
        }
        this.selectedMarker = L.marker([row.latitude, row.longitude], {icon: this.iconDefault}).addTo(this.map);
    }

    private processEvents(): void {
        if (this.historyEvents.length <= 0) {
            return;
        }

        let latlngs = _.map(this.historyEvents, (event) => {
           return L.latLng([event.latitude, event.longitude]); //new LatLng(event.latitude, event.longitude);
        });

        if (this.polyline) {
            this.map.removeLayer(this.polyline);
        }

        if (this.decor) {
            this.map.removeLayer(this.decor);
        }

        this.polyline = L.polyline(_.reverse(latlngs), {color: 'red'}).addTo(this.map);
        this.map.fitBounds(this.polyline.getBounds());

        this.decor = L.polylineDecorator(this.polyline, {
            patterns: [
                {
                    offset: 0,
                    repeat: 60,
                    symbol:
                        L.Symbol.arrowHead({
                            pixelSize: 15,
                            headAngle: 45,
                            pathOptions:
                                {
                                    fillOpacity: 0.9,
                                    weight: 0
                                }
                        })
                }]}).addTo(this.map);
    }

    // private initSvg() {
    //     let parentDiv = document.getElementById('div-chart');
    //     this.width = parentDiv.clientWidth;
    //     this.height = parentDiv.clientHeight;
    //
    //     //init Axis
    //     this.x = d3.scaleTime().rangeRound([0, this.width - 40]);
    //     this.y = d3.scaleLinear().rangeRound([this.height, 40]);
    //
    //     this.svg = d3.select('#div-chart').append('svg')
    //         .attr("width", '100%')
    //         .attr("height", '100%')
    //         .attr("preserveAspectRatio", "xMidYMid meet")
    //         .attr("viewBox", '0 0 '+ this.width+' '+ this.height);
    //
    //     this.chart = this.svg.append("g")
    //         .attr('class', 'chart')
    //         .attr("transform", "translate(30, -30)");
    //
    //     this.yAxis = d3.axisLeft(this.y)
    //         .ticks(10)
    //         .tickSizeInner(-this.width)
    //         .tickSizeOuter(0)
    //         .tickPadding(10);
    //
    //     this.xAxis = d3.axisBottom(this.x)
    //         .ticks(12)
    //         .tickSizeInner(-this.height + 40)
    //         .tickSizeOuter(0)
    //         .tickPadding(10);
    //     this.line = d3.line()
    //         .curve(d3.curveLinear)
    //         .x( (d: any) => this.x(d.timestamp) )
    //         .y( (d: any) => this.y(d.speedKPH) );
    // }

    private draw() {

        let uHist = _.uniqBy(this.historyEventsOptimizeForChart, 'timestamp');
        _.forEach(uHist, (x) => {
            this.timestampCol.push(x.timestamp);
            this.speedKphCol.push(x.speedKPH);
            this.fuelLevelCol.push(x.fuelLevel);
        });

        if (this.chart) {
            //update
            this.chart.load({
                columns: [
                    this.timestampCol,
                    this.speedKphCol,
                    this.fuelLevelCol
                ]
            })
        } else {
            this.chart = c3.generate({
                bindto: '#chart2',
                data: {
                    columns: [
                        this.timestampCol,
                        this.speedKphCol,
                        this.fuelLevelCol
                    ],
                    x: 'timestamp'
                }
            });
        }
        // this.x.domain(d3.extent(this.historyEventsOptimizeForChart, (d) => d.timestamp ));
        // this.y.domain(d3.extent(this.historyEventsOptimizeForChart, (d) => d.speedKPH ));
        //
        // if (!this.update) {
        //     this.update = true;
        //
        //     this.chart.append("g")
        //         .attr("class", "x axis")
        //         .attr("transform", "translate(0," + this.height + ")")
        //         .call(this.xAxis);
        //
        //     this.chart.append("g")
        //         .attr("class", "y axis")
        //         .call(this.yAxis);
        //
        //     this.chart
        //         .append("path")
        //         .attr("fill", "lightblue")
        //         .attr("stroke", "red")
        //         .attr("stroke-linejoin", "round")
        //         .attr("stroke-linecap", "round")
        //         .attr("stroke-width", 0.5)
        //         .attr("class", "line")
        //         .attr("d", this.line(this.historyEventsOptimizeForChart));
        // } else {
        //     let svg = d3.select('#div-chart').select('svg').transition();
        //     svg.select('.line')
        //         .duration(750)
        //         .attr("d", this.line(this.historyEventsOptimizeForChart));
        //     svg.select('.x.axis')
        //         .duration(750)
        //         .call(this.xAxis);
        //
        //     svg.select('.y.axis')
        //         .duration(750)
        //         .call(this.yAxis);
        // }

    }
}
