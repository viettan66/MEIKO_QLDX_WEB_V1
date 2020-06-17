import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BangsapcaComponent } from './bangsapca.component';

describe('BangsapcaComponent', () => {
  let component: BangsapcaComponent;
  let fixture: ComponentFixture<BangsapcaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BangsapcaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BangsapcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
