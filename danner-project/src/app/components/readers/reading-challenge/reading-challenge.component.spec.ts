import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingChallengeComponent } from './reading-challenge.component';

describe('ReadingChallengeComponent', () => {
  let component: ReadingChallengeComponent;
  let fixture: ComponentFixture<ReadingChallengeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadingChallengeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadingChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
