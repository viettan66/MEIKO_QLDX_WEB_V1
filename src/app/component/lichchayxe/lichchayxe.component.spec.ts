import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LichchayxeComponent } from './lichchayxe.component';

describe('LichchayxeComponent', () => {
  let component: LichchayxeComponent;
  let fixture: ComponentFixture<LichchayxeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LichchayxeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LichchayxeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
