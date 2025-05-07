import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentGrievanceAddComponent } from './resident-grievance-add.component';

describe('ResidentGrievanceAddComponent', () => {
  let component: ResidentGrievanceAddComponent;
  let fixture: ComponentFixture<ResidentGrievanceAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidentGrievanceAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidentGrievanceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
