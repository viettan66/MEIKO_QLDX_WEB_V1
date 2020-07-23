import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DangkyxeComponent } from './dangkyxe.component';

describe('DangkyxeComponent', () => {
  let component: DangkyxeComponent;
  let fixture: ComponentFixture<DangkyxeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DangkyxeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DangkyxeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
