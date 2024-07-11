import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAtrrValueComponent } from './add-atrr-value.component';

describe('AddAtrrValueComponent', () => {
  let component: AddAtrrValueComponent;
  let fixture: ComponentFixture<AddAtrrValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAtrrValueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddAtrrValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
