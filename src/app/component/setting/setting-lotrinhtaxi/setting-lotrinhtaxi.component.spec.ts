import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingLotrinhtaxiComponent } from './setting-lotrinhtaxi.component';

describe('SettingLotrinhtaxiComponent', () => {
  let component: SettingLotrinhtaxiComponent;
  let fixture: ComponentFixture<SettingLotrinhtaxiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingLotrinhtaxiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingLotrinhtaxiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
