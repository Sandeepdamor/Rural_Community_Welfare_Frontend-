import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalEventsDeleteComponent } from './local-events-delete.component';

describe('LocalEventsDeleteComponent', () => {
  let component: LocalEventsDeleteComponent;
  let fixture: ComponentFixture<LocalEventsDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalEventsDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalEventsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
