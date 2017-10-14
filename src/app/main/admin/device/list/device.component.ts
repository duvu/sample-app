import {Component, OnInit, ViewChild} from '@angular/core';
import {DeviceService} from "../../../../services/device.service";
import {Device} from "../../../../models/Device";
import {MatDialog, MatDialogConfig, MatPaginator, MatSnackBar} from "@angular/material";
import {ConfirmDeleteDeviceDialog} from "./confirm-delete-device.dialog";
import {Observable} from "rxjs/Observable";
import {DataSource} from "@angular/cdk/collections";

@Component({
    selector: 'app-device',
    templateUrl: './device.component.html',
    styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {
    deviceList: Device[];
    dataSource: DeviceDataSource;
    deviceActive: number = 0;
    displayedColumns = ['toggleColumn', 'deviceInfo', 'deviceExpired', 'notes', 'actions'];

    loading: boolean = true;

    config: MatDialogConfig = {
        disableClose: false,
        width: '',
        height: '',
        position: {
            top: '',
            bottom: '',
            left: '',
            right: ''
        },
        data: {
            message: 'Jazzy jazz jazz'
        }
    };
    @ViewChild(MatPaginator) paginator: MatPaginator;
    constructor(private _service: DeviceService,
                private _snackBar: MatSnackBar,
                private _dialog: MatDialog) { }

    ngOnInit() {
        // this.load();
        this.dataSource = new DeviceDataSource(this._service, this.paginator);
    }

    // load(): void {
    //     this.loading = true;
    //     this._service.getAll().subscribe(
    //         devices => {
    //             this.deviceList = devices
    //             for (let i = 0; i< devices.length; i++) {
    //                 if (devices[i].isActive) {
    //                     this.deviceActive++;
    //                 }
    //             }
    //             this.loading = false;
    //         },
    //         error => {
    //             console.log("error", error);
    //         },
    //         () => {
    //
    //         }
    //     );
    // }
    toggle(deviceId: string): void {
        this._service.toggle(deviceId).subscribe(
            device => {
                //update
            },
            error => {
                //error
            },
            () => {}
        );
    }
    openDeleteDialog(device: Device): void {
        let dialogRef = this._dialog.open(ConfirmDeleteDeviceDialog, this.config);
        dialogRef.componentInstance.device = device;
        dialogRef.afterClosed().subscribe(
            result => {
                if (result.error || result.success) {
                    this._snackBar.open(result.message, null, {
                        duration: 2000
                    });
                }
                if (result.success) {
                    for (let i = 0; i < this.deviceList.length; i++) {
                        let _d = this.deviceList[i];
                        if (_d.deviceID === device.deviceID) {
                            this.deviceList.splice(i, 1);
                            break;
                        }
                    }
                }
            },
            error => {

            },
            () => {

            }
        );
    }
}

export class DeviceDataSource extends DataSource<any> {
    constructor(private _service: DeviceService, private _paginator: MatPaginator) {
        super();
    }
    connect(): Observable<Device[]> {

        return null;
        // return this._paginator.page.map(() => {
        //
        // });
        // return Observable.merge([this._paginator.page]).map(() => {
        //
        // })
        // return this._paginator.page.map(
        //     () => {
        //         return this._service.getPagination(this._paginator.pageIndex, this._paginator.pageSize)
        //     }
        // );
        //return this._service.getPagination(this._paginator.pageIndex, this._paginator.pageSize);

        // return this._service.getAll();
    //     load(): void {
    //         this.loading = true;
    //     this._service.getAll().subscribe(
    //         devices => {
    //             this.deviceList = devices
    //             for (let i = 0; i< devices.length; i++) {
    //                 if (devices[i].isActive) {
    //                     this.deviceActive++;
    //                 }
    //             }
    //             this.loading = false;
    //         },
    //         error => {
    //             console.log("error", error);
    //         },
    //         () => {
    //
    //         }
    //     );
    // }
    }

    disconnect(): void {
        //throw new Error("Method not implemented.");
    }

}
