import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageDailogComponent } from './message-dailog.component';

describe('MessageDailogComponent', () => {
  let component: MessageDailogComponent;
  let fixture: ComponentFixture<MessageDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageDailogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
