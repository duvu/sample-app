import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { AddEditContactComponent } from 'app/main/administration/contact/add-edit-contact/add-edit-contact.component';
import { OptionalColumnContactComponent } from 'app/main/administration/contact/optional-column-contact/optional-column-contact.component';
import { Contact } from 'app/models/contact';
import { ContactRequest } from 'app/models/request/contact.request';
import { ContactService } from 'app/services/contact.service';
import { merge, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { ApplicationContext } from 'app/application-context';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

    constructor(public dialog: MatDialog, private contactService: ContactService,
                private applicationContext: ApplicationContext) { }
    dataSource: Array<Contact>;

    displayedColumns: string[] = ['id', 'name', 'description', 'firstName', 'lastName', 'title', 'phoneNumber', 'emailAddress', 'addressLine1', 'addressLine2', 'createdBy', 'createdOn', 'updatedBy', 'updatedOn']
    resultsLength = 0;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    ngOnInit() {
        this.sort.sortChange.subscribe(() => {
            this.paginator.pageIndex = 0;
        });
        merge(this.sort.sortChange, this.paginator.page)
        .pipe(
            startWith({}),
            switchMap(() => {
                this.applicationContext.spin(true);
                return this.contactService!.searchAndSort(
                    this.paginator.pageIndex, this.paginator.pageSize,
                    this.sort.active, this.sort.direction);
            }),
            map(data => {
                this.applicationContext.spin(false);
                this.resultsLength = data.totalElements;
                return data.content;
            }),
            catchError(() => {
                this.applicationContext.spin(false);
                return of([]);
            })
        ).subscribe(data => {
            this.dataSource = data;
        })
    }

    dialogColumnOptions() {
        const dialogRef = this.dialog.open(OptionalColumnContactComponent, {
            //
        });
        dialogRef.afterClosed().subscribe(
            result => {}
        )
    }

    dialogNewContact() {
        const contact = new Contact();
        const dialogRef = this.dialog.open(AddEditContactComponent, {
           width: '800px',
            data: contact
        });
        dialogRef.afterClosed().subscribe(
            result => {
                this.create(contact);
            }
        )
    }

    create(data: ContactRequest | Contact): void {
        if (data) {
            data.publishInCompany = data.publishInCompany !== undefined;
            this.contactService.create(data).subscribe(
                resp => {
                    console.log('datt', resp);
                }
            );
        }
    }

    applyFilter(value: any) {

    }
}


