import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AadhaarVerificationComponent } from './aadhaar-verification.component';

describe('AadhaarVerificationComponent', () => {
  let component: AadhaarVerificationComponent;
  let fixture: ComponentFixture<AadhaarVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AadhaarVerificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AadhaarVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
