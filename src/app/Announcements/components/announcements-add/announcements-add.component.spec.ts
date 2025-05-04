import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementsAddComponent } from './announcements-add.component';

describe('AnnouncementsAddComponent', () => {
  let component: AnnouncementsAddComponent;
  let fixture: ComponentFixture<AnnouncementsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncementsAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
