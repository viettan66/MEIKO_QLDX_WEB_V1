import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuyenxeNhanvienlamthemgioComponent } from './tuyenxe-nhanvienlamthemgio.component';

describe('TuyenxeNhanvienlamthemgioComponent', () => {
  let component: TuyenxeNhanvienlamthemgioComponent;
  let fixture: ComponentFixture<TuyenxeNhanvienlamthemgioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuyenxeNhanvienlamthemgioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuyenxeNhanvienlamthemgioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
