import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementListComponent } from './announcement-list.component';

describe('AnnouncementListComponent', () => {
  let component: AnnouncementListComponent;
  let fixture: ComponentFixture<AnnouncementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncementListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
