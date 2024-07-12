import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentCostComponent } from './shipment-cost.component';

describe('ShipmentCostComponent', () => {
  let component: ShipmentCostComponent;
  let fixture: ComponentFixture<ShipmentCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShipmentCostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShipmentCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
