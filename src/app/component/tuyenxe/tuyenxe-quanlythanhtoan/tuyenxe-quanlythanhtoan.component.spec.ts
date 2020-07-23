import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuyenxeQuanlythanhtoanComponent } from './tuyenxe-quanlythanhtoan.component';

describe('TuyenxeQuanlythanhtoanComponent', () => {
  let component: TuyenxeQuanlythanhtoanComponent;
  let fixture: ComponentFixture<TuyenxeQuanlythanhtoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuyenxeQuanlythanhtoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuyenxeQuanlythanhtoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
