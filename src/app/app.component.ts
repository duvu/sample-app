import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProgressBarService} from "./services/progress-bar.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-root',
  template: `
      <mat-progress-bar class="main-progress-bar" mode="indeterminate" *ngIf="loading"></mat-progress-bar>
      <router-outlet fullscreen></router-outlet>
  `,
  styles: [`
      .main-progress-bar {
          height: 5px;
          z-index: 1;
      }`]
})
export class AppComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    loading: boolean;
    ngOnInit(): void {
        this.subscription = this.progress.showing$.subscribe(
            showing => {
                setTimeout(_ => this.showLoading(showing));
            }
        );
    }
    showLoading(showing): void {
        this.loading = showing;
    }
    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }

    constructor(private progress: ProgressBarService) {

    }
}
