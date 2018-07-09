import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrdersModalComponent } from './view-orders-modal.component';

describe('ViewOrdersModalComponent', () => {
  let component: ViewOrdersModalComponent;
  let fixture: ComponentFixture<ViewOrdersModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOrdersModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOrdersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
