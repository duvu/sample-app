import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit, AfterViewInit {
    url_: string;
  constructor(private router: Router) { }

  ngOnInit() {
      this.router.events
      .filter(event => event instanceof NavigationStart)
      .subscribe((event: NavigationStart) => {
          console.log('...Event', event);
         this.url_ = event.url;
      });
  }
    ngAfterViewInit(): void {
        console.log("...URL", this.url_);

        if (!this.url_) {
            this.url_ = "/main/_admin/_account";
        }
        this.router.navigate([this.url_]);
    }
}
