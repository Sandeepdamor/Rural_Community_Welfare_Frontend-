import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SarpanchProfileComponent } from './sarpanch-profile.component';

describe('SarpanchProfileComponent', () => {
  let component: SarpanchProfileComponent;
  let fixture: ComponentFixture<SarpanchProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SarpanchProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SarpanchProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
