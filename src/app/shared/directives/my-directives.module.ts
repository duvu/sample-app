import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsAdminDirective } from './is-admin.directive';
import { ShowIfRoleDirective } from './show-if-role.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
      IsAdminDirective,
      ShowIfRoleDirective
  ],
  exports: [
      IsAdminDirective,
      ShowIfRoleDirective
  ]
})
export class MyDirectivesModule { }
