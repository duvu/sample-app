import { Component, OnInit } from '@angular/core';
import { Account } from '../models/Account';
import {NavigationEnd, Router} from "@angular/router";
import {AppService} from "../services/app.service";
import {MdIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";
import icon = L.icon;
@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  profile: Account;
  constructor(private app: AppService, private router: Router, iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) {
      // iconRegistry.addSvgIconSet(
      //     sanitizer.bypassSecurityTrustResourceUrl('assets/icons/icons.svg'));

      iconRegistry.registerFontClassAlias("default", "material-icons");
      iconRegistry.setDefaultFontSetClass("material-icons");
  }

  ngOnInit() {
      this.app.getCurrentAccount().subscribe(
          account => {
              this.profile = account;
          }
      );

      this.router.events.subscribe(
          data => {
              if (data instanceof NavigationEnd && data.url.endsWith('/m')) {
                  this.router.navigate(['m', 'live']);
              }
          }
      );
  }

  logout() {
    this.app.logout();
    this.router.navigate(['/login']);
  }
}
