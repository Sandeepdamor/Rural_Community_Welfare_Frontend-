import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServiceCategoryComponent } from './add-service-category.component';

describe('AddServiceCategoryComponent', () => {
  let component: AddServiceCategoryComponent;
  let fixture: ComponentFixture<AddServiceCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddServiceCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddServiceCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
