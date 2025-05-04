import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrievanceListComponent } from './grievance-list.component';

describe('GrievanceListComponent', () => {
  let component: GrievanceListComponent;
  let fixture: ComponentFixture<GrievanceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrievanceListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrievanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
