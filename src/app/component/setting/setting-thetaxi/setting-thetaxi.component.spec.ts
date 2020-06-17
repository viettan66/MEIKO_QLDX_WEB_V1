import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingThetaxiComponent } from './setting-thetaxi.component';

describe('SettingThetaxiComponent', () => {
  let component: SettingThetaxiComponent;
  let fixture: ComponentFixture<SettingThetaxiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingThetaxiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingThetaxiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
