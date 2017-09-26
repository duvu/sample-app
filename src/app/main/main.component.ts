import { Component, OnInit } from '@angular/core';
import { Account } from '../models/Account';
import {NavigationEnd, Router} from "@angular/router";
import {AppService} from "../services/app.service";
import {MdIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  profile: Account;
  constructor(private app: AppService, private router: Router) {}

  ngOnInit() {
      console.log('initing ...');
  }

  logout() {
    this.app.logout();
    this.router.navigate(['/login']);
  }
}
