import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributesValuesComponent } from './attributes-values.component';

describe('AttributesValuesComponent', () => {
  let component: AttributesValuesComponent;
  let fixture: ComponentFixture<AttributesValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttributesValuesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttributesValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
