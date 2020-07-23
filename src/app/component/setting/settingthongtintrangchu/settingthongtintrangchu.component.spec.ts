import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingthongtintrangchuComponent } from './settingthongtintrangchu.component';

describe('SettingthongtintrangchuComponent', () => {
  let component: SettingthongtintrangchuComponent;
  let fixture: ComponentFixture<SettingthongtintrangchuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingthongtintrangchuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingthongtintrangchuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
