import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingDiadiemTuyenxeComponent } from './setting-diadiem-tuyenxe.component';

describe('SettingDiadiemTuyenxeComponent', () => {
  let component: SettingDiadiemTuyenxeComponent;
  let fixture: ComponentFixture<SettingDiadiemTuyenxeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingDiadiemTuyenxeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingDiadiemTuyenxeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
