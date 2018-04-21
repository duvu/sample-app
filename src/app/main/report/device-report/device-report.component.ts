import { Component, OnInit, ViewChild } from '@angular/core';
import { DeviceLittle } from 'app/shared/models/little/device-little';
import { MatDrawer, MatSidenav, MatTableDataSource } from '@angular/material';
import { DeviceService } from 'app/shared/services/device.service';
import { Util } from 'app/shared/utils/Util';
import { WaitingService } from 'app/shared/services/waiting.service';

@Component({
    selector: 'app-report',
    templateUrl: './device-report.component.html',
    styleUrls: ['./device-report.component.scss']
})
export class DeviceReportComponent implements OnInit {
    deviceList: DeviceLittle[];
    selected: DeviceLittle | any;
    tIcon: string = 'back';

    @ViewChild(MatDrawer) sideNav: MatDrawer;

    constructor(private deviceService: DeviceService,
                private spinner: WaitingService) { }

    ngOnInit() {
        this.spinner.show(true);
        this.selected = {};
        this.deviceService.getAllLittle().subscribe(
            response => {
                this.deviceList = response;
                this.selected = this.deviceList[0];
            },
            error => {},
            () => {
                this.spinner.show(false);
            }
        );
    }


    applyFilter(filterValue: string) {
        // filterValue = filterValue.trim(); // Remove whitespace
        // filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        // this.deviceTableDataSource.filter = filterValue;
    }


    selectThisDevice(device: DeviceLittle): void {
        console.log('Device: ', device);
        this.selected = device;
        // if (this.oldSelectedDevice) {
        //     this.oldSelectedDevice.selected = false;
        // }
        // device.selected = !device.selected;
        //
        // let evdt = _.find(this.liveEvents, function (e) {
        //     return device.id === e.devId;
        // });
        // let center = L.latLng(evdt.latitude, evdt.longitude);
        // this.map.setView(center, 15);
        //
        // this.oldSelectedDevice = device;
    }

    timeAgeToString(timestamp: number): string {
        return Util.getTimeRangeString(timestamp);
    }

    tonggleSidebar(e: any) {
        e.stopPropagation();
        this.sideNav.toggle();
        this.tIcon = this.sideNav.opened ? 'back' : 'sub-menu';
    }

}
