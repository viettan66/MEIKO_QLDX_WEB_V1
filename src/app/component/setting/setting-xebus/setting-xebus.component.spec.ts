import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingXebusComponent } from './setting-xebus.component';

describe('SettingXebusComponent', () => {
  let component: SettingXebusComponent;
  let fixture: ComponentFixture<SettingXebusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingXebusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingXebusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
