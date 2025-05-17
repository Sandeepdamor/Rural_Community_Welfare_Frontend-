import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalEventsComponent } from './local-events.component';

describe('LocalEventsComponent', () => {
  let component: LocalEventsComponent;
  let fixture: ComponentFixture<LocalEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalEventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
