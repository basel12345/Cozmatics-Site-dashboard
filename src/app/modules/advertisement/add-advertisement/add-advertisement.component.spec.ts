import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdvertisementsComponent } from './add-advertisement.component';

describe('AddAdvertisementsComponent', () => {
  let component: AddAdvertisementsComponent;
  let fixture: ComponentFixture<AddAdvertisementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAdvertisementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddAdvertisementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
