import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../../../services/account/account.service";
import {MatSnackBar} from "@angular/material";

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
    showSpinner: boolean = false;
    accountList: Account[];
    currentAccount: Account;
    constructor(private accountService: AccountService, private snackBar: MatSnackBar) {}

    ngOnInit() {
        this.getAllAccounts();
    }

    getAllAccounts () {
        this.showSpinner = true;
        this.accountService.getAll()
            .subscribe(
                data => this.accountList = data,
                err => console.log(err),
                () => {
                    this.showSpinner = false;
                    console.log("Complete", this.accountList);
                }
            );
        this.accountService.getCurrentAccount().subscribe(
            account => {
                console.log('Current Account', account);
                this.currentAccount = account;
            },
            err => {
                console.log(err);
            }
        );
    }
    toggleStatus(account) {
        //--todo if toggle current account will need to end current session
        //-- need to warning also
        this.showSpinner = true;
        this.accountService.toggleStatus(account.accountID)
        .subscribe(
            _account => {},
            err => {
                this.snackBar.open(err, null, {
                    duration: 2000
                });
                account.isActive = false;
            },
        );
    }

    edit(accountId: string) {
        this.accountService.routeToEdit(accountId);
    }
    del(accountId: string) {}
}
