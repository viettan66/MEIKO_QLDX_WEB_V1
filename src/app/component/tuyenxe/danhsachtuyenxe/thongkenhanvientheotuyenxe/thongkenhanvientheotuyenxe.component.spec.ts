import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongkenhanvientheotuyenxeComponent } from './thongkenhanvientheotuyenxe.component';

describe('ThongkenhanvientheotuyenxeComponent', () => {
  let component: ThongkenhanvientheotuyenxeComponent;
  let fixture: ComponentFixture<ThongkenhanvientheotuyenxeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongkenhanvientheotuyenxeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongkenhanvientheotuyenxeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
