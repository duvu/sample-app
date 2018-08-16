import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalColumnContactComponent } from './optional-column-contact.component';

describe('OptionalColumnContactComponent', () => {
  let component: OptionalColumnContactComponent;
  let fixture: ComponentFixture<OptionalColumnContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionalColumnContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionalColumnContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
