import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSarpanchComponent } from './add-sarpanch.component';

describe('AddSarpanchComponent', () => {
  let component: AddSarpanchComponent;
  let fixture: ComponentFixture<AddSarpanchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSarpanchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSarpanchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
