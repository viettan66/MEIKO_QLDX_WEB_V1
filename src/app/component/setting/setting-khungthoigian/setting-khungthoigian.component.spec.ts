import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingKhungthoigianComponent } from './setting-khungthoigian.component';

describe('SettingKhungthoigianComponent', () => {
  let component: SettingKhungthoigianComponent;
  let fixture: ComponentFixture<SettingKhungthoigianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingKhungthoigianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingKhungthoigianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
