import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SarpanchListComponent } from './sarpanch-list.component';

describe('SarpanchListComponent', () => {
  let component: SarpanchListComponent;
  let fixture: ComponentFixture<SarpanchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SarpanchListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SarpanchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
