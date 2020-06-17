import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingDiadiemComponent } from './setting-diadiem.component';

describe('SettingDiadiemComponent', () => {
  let component: SettingDiadiemComponent;
  let fixture: ComponentFixture<SettingDiadiemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingDiadiemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingDiadiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
