import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsAdminDirective } from './is-admin.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [IsAdminDirective],
  exports: [IsAdminDirective]
})
export class MyDirectivesModule { }
