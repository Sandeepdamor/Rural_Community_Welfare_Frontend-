import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCategoryListComponent } from './service-category-list.component';

describe('ServiceCategoryListComponent', () => {
  let component: ServiceCategoryListComponent;
  let fixture: ComponentFixture<ServiceCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceCategoryListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
