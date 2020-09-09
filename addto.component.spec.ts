import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtoComponent } from './addto.component';

describe('AddtoComponent', () => {
  let component: AddtoComponent;
  let fixture: ComponentFixture<AddtoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
