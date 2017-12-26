import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalColumnPrivilegeComponent } from './optional-column-privilege.component';

describe('OptionalColumnPrivilegeComponent', () => {
  let component: OptionalColumnPrivilegeComponent;
  let fixture: ComponentFixture<OptionalColumnPrivilegeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionalColumnPrivilegeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionalColumnPrivilegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
