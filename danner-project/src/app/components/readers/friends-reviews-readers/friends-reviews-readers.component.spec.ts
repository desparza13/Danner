import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsReviewsReadersComponent } from './friends-reviews-readers.component';

describe('FriendsReviewsReadersComponent', () => {
  let component: FriendsReviewsReadersComponent;
  let fixture: ComponentFixture<FriendsReviewsReadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsReviewsReadersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendsReviewsReadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
