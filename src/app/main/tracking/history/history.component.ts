import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import * as L from 'leaflet';
import 'leaflet-polylinedecorator';
import 'leaflet-easybutton';

//import 'leaflet.markercluster';
import { EventService } from 'app/shared/services/event.service';
import { EventData } from 'app/shared/models/event-data';

import * as _ from 'lodash';
import { LatLng, Polyline } from 'leaflet';
import { MatTableDataSource } from '@angular/material';

import * as d3 from 'd3';
import { Stocks } from './shared/data';

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
    private polyline: Polyline;
    private decor: any;
    private timeFrom: number;
    private  timeTo: number;

    private customDefault: L.Icon;

    dataSource: MatTableDataSource<EventData> | null;
    displayedColumns = ['id', 'deviceId', 'deviceName', 'latitude', 'longitude', 'altitude', 'heading', 'speedKPH', 'address', 'timestamp'];


    //charting
    private margin = {top: 20, right: 20, bottom: 30, left: 50};
    private width: number;
    private height: number;
    private x: any;
    private y: any;
    private svg: any;
    private line: d3.Line<[number, number]>;

    constructor(private route: ActivatedRoute,
                private eventService: EventService) {

    }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.customDefault = L.icon({
            iconRetinaUrl: '/assets/images/marker-icon-2x.png',
            iconUrl: '/assets/images/marker-icon.png',
            shadowUrl: '/assets/images/marker-shadow.png'
        });

        this.dataSource = new MatTableDataSource();
        this.timeFrom = this.timeFrom ? this.timeFrom : 0;
        this.timeTo = this.timeTo ? this.timeTo : 0;

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

        this.loadHistoryEvents();

        this.initSvg();
        this.initAxis();
        this.drawAxis();
        this.drawLine();
    }

    private loadHistoryEvents(): void {
        this.eventService.getHistoryEvents(this.id, this.timeFrom, this.timeTo).subscribe(
            data => {
                //console.log('Data', data);
                this.historyEvents = data;
                this.dataSource.data = data;
                this.processEvents();

            },
            error => {},
            () => {}
        )
    }

    private processEvents(): void {
        let latlngs = _.map(this.historyEvents, (event) => {
           return new LatLng(event.latitude, event.longitude);
        });

        if (this.polyline) {
            this.map.removeLayer(this.polyline);
        }

        if (this.decor) {
            this.map.removeLayer(this.decor);
        }

        this.polyline = L.polyline(latlngs, {color: 'red'}).addTo(this.map);
        this.map.fitBounds(this.polyline.getBounds());

        this.decor = L.polylineDecorator(this.polyline, {
            patterns: [
                {offset: 25, repeat: 50, symbol: L.Symbol.arrowHead({pixelSize: 15, pathOptions: {fillOpacity: 1, weight: 0}})}
            ]
        }).addTo(this.map);
    }

    private initSvg() {
        let parentDiv = document.getElementById('parent-div');

        // this.width = 900 - this.margin.left - this.margin.right;
        // this.height = 500 - this.margin.top - this.margin.bottom;

        this.width = parentDiv.clientWidth;
        this.height = parentDiv.clientHeight;
        this.svg = d3.select("svg")
            .datum(Stocks)
            .attr("width", '100%')
            .attr("height", '100%')
            .attr("preserveAspectRatio", "xMidYMid meet")
            .attr("viewBox", '0 0 '+ this.width+' '+ this.height)
            .append("g")
            //.attr("transform", "translate(" + Math.min(this.width,this.height)/2 + "," + Math.min(this.width,this.height)/2 + ")");
            // .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
            .attr("transform", "translate(40, -30)");
    }

    private initAxis() {
        this.x = d3.scaleTime().rangeRound([0, this.width - 50]);
        this.y = d3.scaleLinear().rangeRound([this.height, 40]);
        this.x.domain(d3.extent(Stocks, (d) => d.date ));
        this.y.domain(d3.extent(Stocks, (d) => d.value ));
    }

    private drawAxis() {

        this.svg.append("g")
            // .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3.axisBottom(this.x));

        this.svg.append("g")
            // .attr("class", "axis axis--y")
            .call(d3.axisLeft(this.y));
            // .append("text")
            // .attr("class", "axis-title")
            // .attr("transform", "rotate(-90)")
            // .attr("y", 6)
            // .attr("dy", ".71em")
            // .style("text-anchor", "end")
            // .text("Price ($)");
    }

    private drawLine() {
        this.line = d3.line()
            .x( (d: any) => this.x(d.date) )
            .y( (d: any) => this.y(d.value) );

        this.svg
            .append("path")
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("class", "line")
            .attr("d", this.line);
    }
}
