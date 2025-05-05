import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementsDeleteComponent } from './announcements-delete.component';

describe('AnnouncementsDeleteComponent', () => {
  let component: AnnouncementsDeleteComponent;
  let fixture: ComponentFixture<AnnouncementsDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncementsDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
