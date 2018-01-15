import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit, AfterViewInit {
  constructor(private router: Router) { }

  ngOnInit() { }
    ngAfterViewInit(): void {
        this.router.navigate(["/main/_admin/_account"]);
    }
}
