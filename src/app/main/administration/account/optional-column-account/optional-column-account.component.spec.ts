import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalColumnAccountComponent } from './optional-column-account.component';

describe('OptionalColumnAccountComponent', () => {
  let component: OptionalColumnAccountComponent;
  let fixture: ComponentFixture<OptionalColumnAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionalColumnAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionalColumnAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
