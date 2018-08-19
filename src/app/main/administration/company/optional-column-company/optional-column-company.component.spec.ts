import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalColumnCompanyComponent } from './optional-column-company.component';

describe('OptionalColumnCompanyComponent', () => {
  let component: OptionalColumnCompanyComponent;
  let fixture: ComponentFixture<OptionalColumnCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionalColumnCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionalColumnCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
