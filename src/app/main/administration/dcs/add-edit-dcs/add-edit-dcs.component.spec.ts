import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDcsComponent } from './add-edit-dcs.component';

describe('AddEditDcsComponent', () => {
  let component: AddEditDcsComponent;
  let fixture: ComponentFixture<AddEditDcsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditDcsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditDcsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
