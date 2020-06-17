import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingDiadiemDanhsachComponent } from './setting-diadiem-danhsach.component';

describe('SettingDiadiemDanhsachComponent', () => {
  let component: SettingDiadiemDanhsachComponent;
  let fixture: ComponentFixture<SettingDiadiemDanhsachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingDiadiemDanhsachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingDiadiemDanhsachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
