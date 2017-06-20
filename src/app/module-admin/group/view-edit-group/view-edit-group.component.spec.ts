import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEditGroupComponent } from './view-edit-group.component';

describe('ViewEditGroupComponent', () => {
  let component: ViewEditGroupComponent;
  let fixture: ComponentFixture<ViewEditGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEditGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEditGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
