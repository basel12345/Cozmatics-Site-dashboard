import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesProductComponent } from './images-product.component';

describe('ImagesProductComponent', () => {
  let component: ImagesProductComponent;
  let fixture: ComponentFixture<ImagesProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagesProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImagesProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
