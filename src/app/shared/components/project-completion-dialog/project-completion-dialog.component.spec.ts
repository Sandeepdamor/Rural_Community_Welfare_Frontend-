import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCompletionDialogComponent } from './project-completion-dialog.component';

describe('ProjectCompletionDialogComponent', () => {
  let component: ProjectCompletionDialogComponent;
  let fixture: ComponentFixture<ProjectCompletionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCompletionDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectCompletionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
