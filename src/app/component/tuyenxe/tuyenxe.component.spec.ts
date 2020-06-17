import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuyenxeComponent } from './tuyenxe.component';

describe('TuyenxeComponent', () => {
  let component: TuyenxeComponent;
  let fixture: ComponentFixture<TuyenxeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuyenxeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuyenxeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
