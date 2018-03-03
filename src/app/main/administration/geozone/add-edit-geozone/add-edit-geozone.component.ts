import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-draw';

const TILE_OSM_URL = 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
const TILE_MAPBOX_URL = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';
const TILE_GOOGLE_URL = 'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}';

@Component({
  selector: 'app-add-edit-geozone',
  templateUrl: './add-edit-geozone.component.html',
  styleUrls: ['./add-edit-geozone.component.scss']
})
export class AddEditGeozoneComponent implements OnInit {

    private customDefault: L.Icon;
    private map: L.Map;


    constructor() { }

    ngOnInit() {
        this.customDefault = L.icon({
            iconRetinaUrl: '/assets/images/marker-icon-2x.png',
            iconUrl: '/assets/images/marker-icon.png',
            shadowUrl: '/assets/images/marker-shadow.png'
        });
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

        this.map = L.map('map-id', {
            //zoomControl: false,
            //drawControl: true,
            center: L.latLng(21.731253, 105.996139),
            zoom: 12,
        });

        L.control.scale().addTo(this.map);
        L.control.zoom().setPosition('bottomleft');

        let drawnItems = L.featureGroup().addTo(this.map);

        L.control.layers(
            {
                'osm': osm.addTo(this.map),
                'google': google,
                'mapbox': mapbox
            },
            {
                'drawlayer': drawnItems
            },
            {
                position: 'topright',
                collapsed: false
            }).addTo(this.map);


        let drawControl = new L.Control.Draw({
            edit: {
                featureGroup: drawnItems
            }
        });
        this.map.addControl(drawControl);

    }

}
