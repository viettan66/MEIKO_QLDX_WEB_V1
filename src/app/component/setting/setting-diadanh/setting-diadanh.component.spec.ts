import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingDiadanhComponent } from './setting-diadanh.component';

describe('SettingDiadanhComponent', () => {
  let component: SettingDiadanhComponent;
  let fixture: ComponentFixture<SettingDiadanhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingDiadanhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingDiadanhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
