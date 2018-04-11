import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeozoneService } from 'app/shared/services/geozone.service';
import { Geofence } from 'app/shared/models/geozone';
import { MatDialog } from '@angular/material';
import { AddEditGeozoneComponent } from 'app/main/administration/geozone/add-edit-geozone/add-edit-geozone.component';

import * as _ from 'lodash';
import * as L from 'leaflet';
import 'leaflet-draw';
import { ToastService } from 'app/shared/toast.service';
import { RequestGeozone } from 'app/shared/models/request/request-geozone';
import { ApplicationContext } from 'app/shared/services/application-context.service';
import { GeoUtils } from 'app/main/administration/geozone/GeoUtils';
import { GeoJSON, LatLng, LatLngBounds, Layer, LeafletEvent, Point } from 'leaflet';
import { Feature, GeoJsonObject } from 'geojson';
import { FeatureGroup } from 'leaflet';

const TILE_OSM_URL = 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
const TILE_MAPBOX_URL = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';
const TILE_GOOGLE_URL = 'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}';

@Component({
    selector: 'app-geozone',
    templateUrl: './geozone.component.html',
    styleUrls: ['./geozone.component.scss']
})
export class GeozoneComponent implements OnInit, AfterViewInit {

    private customDefault: L.Icon;
    private map: L.Map;
    private editableLayers: FeatureGroup;
    private drawControl: any;

    showDetails: boolean = false;

    geofenceList: Array<Geofence>;

    selectedGeofence: Geofence | any = {};
    newOrEdit: boolean = false;

    constructor(
        private dialog: MatDialog,
        private router: Router,
        private toast: ToastService,
        private appContext: ApplicationContext,
        private geozoneService: GeozoneService) { }

    ngOnInit() {
        this.customDefault = L.icon({
            iconRetinaUrl: '/assets/images/marker-icon-2x.png',
            iconUrl: '/assets/images/marker-icon.png',
            shadowUrl: '/assets/images/marker-shadow.png'
        });

        this.loadAllGeozone();
    }

    ngAfterViewInit(): void {
        console.log('init map');
        let osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors';
        let osm = L.tileLayer(TILE_OSM_URL, {
            maxZoom: 18,
            attribution: osmAttrib
        });
        let mapbox = L.tileLayer(TILE_MAPBOX_URL, {
            maxZoom: 18,
            attribution: osmAttrib,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoiaG9haXZ1YmsiLCJhIjoiY2oya3YzbHFuMDAwMTJxazN6Y3k0Y2syNyJ9.4avYQphrtbrrniI_CT0XSA'
        });
        let google = L.tileLayer(TILE_GOOGLE_URL, {
            maxZoom: 18,
            attribution: 'google'
        });

        this.map = L.map('geo-map-id', {
            zoomControl: false,
            center: L.latLng(21.731253, 105.996139),
            zoom: 12,
        });

        L.control.scale().addTo(this.map);
        L.control.zoom().setPosition('bottomleft').addTo(this.map);

        this.editableLayers = L.featureGroup().addTo(this.map);

        L.control.layers(
            {
                'osm': osm.addTo(this.map),
                'google': google,
                'mapbox': mapbox
            },
            {
                'drawlayer': this.editableLayers
            },
            {
                position: 'topright',
                collapsed: true
            }).addTo(this.map);


        this.drawControl = new L.Control.Draw({
            draw: {
                polyline: false,
                circlemarker: false,
                marker: false
            },
            edit: {
                featureGroup: this.editableLayers,
                //edit: false, // disable edit-button
                remove: false
            }
        });

        this.map.on(L.Draw.Event.CREATED, (event: any) => {
            // this.openAddEditGeozoneDialog(event);
            // this.editableLayers.addLayer(event.layer);
            this.showGeofenceDetails(true);
            this.newOrEdit = true;
            this.selectedGeofence = event.layer;
            console.log('object', event);
            console.log('layer', event.layer);
            let gj = event.layer.toGeoJSON();
            // let radius = event.layer._mRadius;
            // console.log('Radius', radius);
            // gj.geometry.radius = radius;
            console.log('layer - geojson', gj);
            //
            // let req = new RequestGeozone();
            // req.name = "abc";
            // req.companyId = 1;
            // req.color = "#ff7800";
            // req.geometry = JSON.stringify(gj.geometry);
            //
            // this.geozoneService.create(req).subscribe(
            //     data => {
            //         console.log("data# ",  data);
            //     },
            //     error => {},
            // () => {}
            // );
            //
            // let ly = L.geoJSON(gj, {
            //     pointToLayer: function (feature, latlng) {
            //         return L.circle(latlng, gj.geometry.radius, {
            //             fillColor: "#ff7800",
            //             color: "#000",
            //             weight: 1,
            //             opacity: 1,
            //             fillOpacity: 0.8
            //         });
            //     }
            // });
            //

            this.editableLayers.addLayer(event.layer);
            //event.layer.editing.enable();
        })
    }

    public showDrawToolbar(show: boolean): void {
        if(show) {
            this.map.addControl(this.drawControl);
        } else {
            this.map.removeControl(this.drawControl);
        }
    }

    private openAddEditGeozoneDialog(event: any) {
        const dialogRef = this.dialog.open(AddEditGeozoneComponent, {
            data: event,
            disableClose: true
        });
        dialogRef.afterClosed().subscribe(
            result => {
                //
            }
        );
    }

    private loadAllGeozone(): void {
        this.geozoneService.getAll().subscribe(
            data => {
                console.log('data', data);
                this.geofenceList = data;
            },
            error => {},
            () => {
                this.drawGeofences();
            }
        );
    }

    private drawGeofences(): void {
        _.forEach(this.geofenceList, (g) => {
            g = GeoUtils.convertGeofence(g);
            let gj: Feature<any>;
            gj = {
                type: "Feature",
                properties: {},
                geometry: g.geometry
            };

            // let ly = L.geoJSON(gj, {
            //     pointToLayer: (feature, latlng) => {
            //         return L.circle(latlng, g.geometry.radius)
            //     }
            // });

            let ly = L.GeoJSON.geometryToLayer(gj, {
                pointToLayer: (feature, latlng) => {
                    return L.circle(latlng, g.geometry.radius)
                }
            });
            this.editableLayers.addLayer(ly);
            let internalId = this.editableLayers.getLayerId(ly);
            g.internalId = internalId;
        });

        // this.editableLayers.eachLayer((layer: Layer) => {
        //     console.log('Added Layer: ', layer);
        //     layer.options.editing || (layer.options.editing = {});
        //     layer.editing.enable();
        // });
        //this.map.panTo(this.editableLayers.getBounds().getCenter());
    }

    //--
    public applyFilter(event: any): void {

    }

    public selectGeofence(geofence: Geofence): void {
        this.showGeofenceDetails(true)

        this.selectedGeofence = GeoUtils.convertGeofence(geofence);

        this.map.panTo(this.center);
    }


    public showGeofenceDetails(show: boolean): void {
        this.showDetails = show;
        if(!show) {
            this.map.removeControl(this.drawControl);
        }
        setTimeout(() => {
            this.map.invalidateSize(true);
        }, 0);
    }

    public isCircle(): boolean {
        return (this.selectedGeofence.geometry && this.selectedGeofence.geometry.type === 'Point');
    }

    public isPolygon(): boolean {
        return (this.selectedGeofence.geometry && this.selectedGeofence.geometry.type === 'Polygon');
    }


    //-- Delete, Edit
    deleteGeofence(event: Event, geofence: Geofence): void {
        event.stopPropagation();
        this.geozoneService._delete(geofence.id).subscribe(
            data => {},
            error => {},
            () => {
                this.toast.info("Deleted geofence #" + geofence.name);
                _.remove(this.geofenceList, (g) => {
                    return (g.id === geofence.id);
                })
            }
        )
    }

    editGeofence(geofence?: Geofence): void {
        if (geofence) {
            this.selectedGeofence = geofence;
        }
        this.newOrEdit = true;

        let layer: Layer | any;
        layer = this.editableLayers.getLayer(this.selectedGeofence.internalId);
        layer.options.editing || (layer.options.editing = {});
        layer.editing.enable();

    }

    saveCurrentGeofence(): void {
        let req = new RequestGeozone();
        // req.companyId = this.appContext.companyId;
        req.updateFromGeofence(this.selectedGeofence);
        this.geozoneService.update(this.selectedGeofence.id, req).subscribe(
            data => {
                console.log('OK');
                this.toast.info('Updated Geofence #' + this.selectedGeofence.name);
            },
            error => {
                this.toast.error('Not able to update geofence #' + this.selectedGeofence.name);
            },
            () => {}
        );
    }

    //-get-set
    get type(): string {
        if (this.selectedGeofence.geometry) {
            return this.selectedGeofence.geometry.type;
        } else {
            return "undefined";
        }

    }
    set type(t: string) {
        this.selectedGeofence.geometry.type = t;
    }

    get coordinates(): any {
        if (this.isCircle()) {
            if(this.selectedGeofence.geometry) {
                return this.selectedGeofence.geometry.coordinates;
            } else {
                return [];
            }
        } else if (this.isPolygon()) {
            if (this.selectedGeofence.geometry) {
                return this.selectedGeofence.geometry.coordinates[0];
            } else {
                return [];
            }
        }
    }



    set coordinates(c: any) {
        if(this.isCircle()) {
            this.selectedGeofence.geometry.coordinates = c;
        } else if (this.isPolygon()) {
            this.selectedGeofence.geometry.coordinates[0] = c;
        }
    }

    get radius(): number {
        if (this.selectedGeofence.geometry) {
            return this.selectedGeofence.geometry.radius;
        } else {
            return 0;
        }
    }
    set radius(r: number) {
        this.selectedGeofence.geometry.radius = r;
    }

    get center(): LatLng {
        if (this.isCircle()) {
            return L.GeoJSON.coordsToLatLng(this.coordinates);
        } else {
            let abc = [];
            _.forEach(this.coordinates, (coor: [number, number]) => {
                abc.push(L.GeoJSON.coordsToLatLng(coor))
            });

            return L.latLngBounds(abc).getCenter();
        }
    }
}
