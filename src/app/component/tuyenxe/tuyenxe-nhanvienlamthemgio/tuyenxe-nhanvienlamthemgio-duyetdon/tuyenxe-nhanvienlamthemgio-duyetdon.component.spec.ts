import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuyenxeNhanvienlamthemgioDuyetdonComponent } from './tuyenxe-nhanvienlamthemgio-duyetdon.component';

describe('TuyenxeNhanvienlamthemgioDuyetdonComponent', () => {
  let component: TuyenxeNhanvienlamthemgioDuyetdonComponent;
  let fixture: ComponentFixture<TuyenxeNhanvienlamthemgioDuyetdonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuyenxeNhanvienlamthemgioDuyetdonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuyenxeNhanvienlamthemgioDuyetdonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
