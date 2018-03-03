import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-geozone',
  templateUrl: './list-geozone.component.html',
  styleUrls: ['./list-geozone.component.scss']
})
export class ListGeozoneComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

    openDialogNewObject(): void {
        this.router.navigate(['/main/_admin/_geozone/add-edit']);
    }
}
