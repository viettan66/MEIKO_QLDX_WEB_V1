import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachtuyenxeComponent } from './danhsachtuyenxe.component';

describe('DanhsachtuyenxeComponent', () => {
  let component: DanhsachtuyenxeComponent;
  let fixture: ComponentFixture<DanhsachtuyenxeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhsachtuyenxeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachtuyenxeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
