import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarComponent } from './bar/bar.component';
import { PieComponent } from './pie/pie.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BarComponent, PieComponent]
})
export class ChartModule { }
