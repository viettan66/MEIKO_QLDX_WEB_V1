import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingDiemtaxiComponent } from './setting-diemtaxi.component';

describe('SettingDiemtaxiComponent', () => {
  let component: SettingDiemtaxiComponent;
  let fixture: ComponentFixture<SettingDiemtaxiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingDiemtaxiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingDiemtaxiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
