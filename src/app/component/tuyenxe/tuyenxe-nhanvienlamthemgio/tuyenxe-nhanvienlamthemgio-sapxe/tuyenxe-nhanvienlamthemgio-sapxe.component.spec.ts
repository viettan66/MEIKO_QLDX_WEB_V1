import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuyenxeNhanvienlamthemgioSapxeComponent } from './tuyenxe-nhanvienlamthemgio-sapxe.component';

describe('TuyenxeNhanvienlamthemgioSapxeComponent', () => {
  let component: TuyenxeNhanvienlamthemgioSapxeComponent;
  let fixture: ComponentFixture<TuyenxeNhanvienlamthemgioSapxeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuyenxeNhanvienlamthemgioSapxeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuyenxeNhanvienlamthemgioSapxeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
