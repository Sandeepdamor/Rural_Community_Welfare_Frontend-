import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrievanceDeleteComponent } from './grievance-delete.component';

describe('GrievanceDeleteComponent', () => {
  let component: GrievanceDeleteComponent;
  let fixture: ComponentFixture<GrievanceDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrievanceDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrievanceDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
