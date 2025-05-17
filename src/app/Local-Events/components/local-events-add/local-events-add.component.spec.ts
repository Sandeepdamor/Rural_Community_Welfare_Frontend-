import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalEventsAddComponent } from './local-events-add.component';

describe('LocalEventsAddComponent', () => {
  let component: LocalEventsAddComponent;
  let fixture: ComponentFixture<LocalEventsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalEventsAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalEventsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
