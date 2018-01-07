import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {PrivilegeService} from '../../../../services/privilege.service';
import {Privilege} from '../../../../models/response/privilege';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-role-update',
  templateUrl: './role-update.component.html',
  styleUrls: ['./role-update.component.scss']
})
export class RoleUpdateComponent implements OnInit {
    public priveledges: Observable<Privilege[]>;

    constructor(public dialogRef: MatDialogRef<RoleUpdateComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any, private privilegeService: PrivilegeService) { }

    ngOnInit() {
        this.priveledges = this.privilegeService.getAll();
    }

    cancel(): void {
        this.dialogRef.close();
    }

    onSave(): void {
        this.dialogRef.close(this.data);
    }

}
