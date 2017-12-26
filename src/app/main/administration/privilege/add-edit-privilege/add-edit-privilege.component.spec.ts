import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPrivilegeComponent } from './add-edit-privilege.component';

describe('AddEditPrivilegeComponent', () => {
  let component: AddEditPrivilegeComponent;
  let fixture: ComponentFixture<AddEditPrivilegeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditPrivilegeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditPrivilegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
