import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageBrandComponent } from './image-brand.component';

describe('ImageBrandComponent', () => {
  let component: ImageBrandComponent;
  let fixture: ComponentFixture<ImageBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageBrandComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImageBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
