import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuyenxeNhanvienlamthemgioChuyenxeComponent } from './tuyenxe-nhanvienlamthemgio-chuyenxe.component';

describe('TuyenxeNhanvienlamthemgioChuyenxeComponent', () => {
  let component: TuyenxeNhanvienlamthemgioChuyenxeComponent;
  let fixture: ComponentFixture<TuyenxeNhanvienlamthemgioChuyenxeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuyenxeNhanvienlamthemgioChuyenxeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuyenxeNhanvienlamthemgioChuyenxeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
