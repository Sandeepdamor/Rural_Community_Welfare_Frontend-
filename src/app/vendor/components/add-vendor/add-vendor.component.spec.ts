import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVendorComponent } from './add-vendor.component';

describe('AddVendorComponent', () => {
  let component: AddVendorComponent;
  let fixture: ComponentFixture<AddVendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddVendorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
