import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuyenxeNhanviendicongtacComponent } from './tuyenxe-nhanviendicongtac.component';

describe('TuyenxeNhanviendicongtacComponent', () => {
  let component: TuyenxeNhanviendicongtacComponent;
  let fixture: ComponentFixture<TuyenxeNhanviendicongtacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuyenxeNhanviendicongtacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuyenxeNhanviendicongtacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
