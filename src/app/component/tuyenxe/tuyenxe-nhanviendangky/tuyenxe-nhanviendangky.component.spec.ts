import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuyenxeNhanviendangkyComponent } from './tuyenxe-nhanviendangky.component';

describe('TuyenxeNhanviendangkyComponent', () => {
  let component: TuyenxeNhanviendangkyComponent;
  let fixture: ComponentFixture<TuyenxeNhanviendangkyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuyenxeNhanviendangkyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuyenxeNhanviendangkyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
