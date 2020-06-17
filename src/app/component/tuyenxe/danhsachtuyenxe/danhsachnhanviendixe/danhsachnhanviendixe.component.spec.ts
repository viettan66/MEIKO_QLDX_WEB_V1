import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachnhanviendixeComponent } from './danhsachnhanviendixe.component';

describe('DanhsachnhanviendixeComponent', () => {
  let component: DanhsachnhanviendixeComponent;
  let fixture: ComponentFixture<DanhsachnhanviendixeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhsachnhanviendixeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachnhanviendixeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
