import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavAuthorsComponent } from './nav-authors.component';

describe('NavAuthorsComponent', () => {
  let component: NavAuthorsComponent;
  let fixture: ComponentFixture<NavAuthorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavAuthorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavAuthorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
