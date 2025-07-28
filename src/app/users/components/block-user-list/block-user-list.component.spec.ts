import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockUserListComponent } from './block-user-list.component';

describe('BlockUserListComponent', () => {
  let component: BlockUserListComponent;
  let fixture: ComponentFixture<BlockUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockUserListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
