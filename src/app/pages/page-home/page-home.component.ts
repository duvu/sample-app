import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/shared/services/app.service';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss']
})
export class PageHomeComponent implements OnInit {

  constructor(private app: AppService) { }

  ngOnInit() {
    this.app.logout();
  }

}
