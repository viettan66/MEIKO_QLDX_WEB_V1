import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCheckallComponent } from './item-checkall.component';

describe('ItemCheckallComponent', () => {
  let component: ItemCheckallComponent;
  let fixture: ComponentFixture<ItemCheckallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCheckallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCheckallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
