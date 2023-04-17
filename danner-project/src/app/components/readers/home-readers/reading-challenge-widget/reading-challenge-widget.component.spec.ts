import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingChallengeWidgetComponent } from './reading-challenge-widget.component';

describe('ReadingChallengeWidgetComponent', () => {
  let component: ReadingChallengeWidgetComponent;
  let fixture: ComponentFixture<ReadingChallengeWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadingChallengeWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadingChallengeWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
