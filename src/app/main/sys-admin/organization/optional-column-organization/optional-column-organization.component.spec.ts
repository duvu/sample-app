import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalColumnOrganizationComponent } from './optional-column-organization.component';

describe('OptionalColumnOrganizationComponent', () => {
  let component: OptionalColumnOrganizationComponent;
  let fixture: ComponentFixture<OptionalColumnOrganizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionalColumnOrganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionalColumnOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
