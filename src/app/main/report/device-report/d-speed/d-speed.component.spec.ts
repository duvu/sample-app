import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DSpeedComponent } from './d-speed.component';

describe('DSpeedComponent', () => {
  let component: DSpeedComponent;
  let fixture: ComponentFixture<DSpeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DSpeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DSpeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
