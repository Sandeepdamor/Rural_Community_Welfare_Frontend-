import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrievanceUpdateComponent } from './grievance-update.component';

describe('GrievanceUpdateComponent', () => {
  let component: GrievanceUpdateComponent;
  let fixture: ComponentFixture<GrievanceUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrievanceUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrievanceUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
