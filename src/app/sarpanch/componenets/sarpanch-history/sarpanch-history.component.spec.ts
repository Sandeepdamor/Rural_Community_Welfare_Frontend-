import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SarpanchHistoryComponent } from './sarpanch-history.component';

describe('SarpanchHistoryComponent', () => {
  let component: SarpanchHistoryComponent;
  let fixture: ComponentFixture<SarpanchHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SarpanchHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SarpanchHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
