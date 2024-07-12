import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShipmentCostComponent } from './add-shipment-cost.component';

describe('AddShipmentCostComponent', () => {
  let component: AddShipmentCostComponent;
  let fixture: ComponentFixture<AddShipmentCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddShipmentCostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddShipmentCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
