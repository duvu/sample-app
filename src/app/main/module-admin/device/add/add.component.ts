import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {Device} from "../../../../models/Device";
import {DeviceService} from "../../../../services/device.service";

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
    newDevice: Device;
    constructor(private _location: Location, private _service: DeviceService) { }

    ngOnInit() {
        this.newDevice = new Device();
    }

    back(): void {
        this._location.back();
    }
    save(): void {
        this._service.add(this.newDevice).subscribe(
            device => {
                console.log('Device created', device);
                this._service.routeToList();
            },
            error => {
                console.log("ERROR", error);
            },
            () => {}
        );
    }
    cancel(): void {
        this.newDevice = null;
        this.back();
    }
}
