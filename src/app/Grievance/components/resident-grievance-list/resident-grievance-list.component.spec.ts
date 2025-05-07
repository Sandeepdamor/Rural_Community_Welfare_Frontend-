import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentGrievanceListComponent } from './resident-grievance-list.component';

describe('ResidentGrievanceListComponent', () => {
  let component: ResidentGrievanceListComponent;
  let fixture: ComponentFixture<ResidentGrievanceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidentGrievanceListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidentGrievanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
