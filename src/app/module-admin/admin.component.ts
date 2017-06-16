import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'gps-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(
        data => {
          if (data instanceof NavigationEnd && data.url.endsWith('/admin')) {
            this.router.navigate(['m', 'admin', 'account']);
          }
        }
    );
  }
}
