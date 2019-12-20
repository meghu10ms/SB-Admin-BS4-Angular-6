import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryCommissionComponent } from './delivery-commission.component';

describe('DeliveryCommissionComponent', () => {
  let component: DeliveryCommissionComponent;
  let fixture: ComponentFixture<DeliveryCommissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryCommissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
