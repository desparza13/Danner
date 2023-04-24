import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAuthorsComponent } from './home-authors.component';

describe('HomeAuthorsComponent', () => {
  let component: HomeAuthorsComponent;
  let fixture: ComponentFixture<HomeAuthorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeAuthorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeAuthorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
