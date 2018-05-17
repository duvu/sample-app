import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DParkingComponent } from './d-parking.component';

describe('DParkingComponent', () => {
  let component: DParkingComponent;
  let fixture: ComponentFixture<DParkingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DParkingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
