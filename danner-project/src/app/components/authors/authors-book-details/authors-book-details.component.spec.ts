import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsBookDetailsComponent } from './authors-book-details.component';

describe('AuthorsBookDetailsComponent', () => {
  let component: AuthorsBookDetailsComponent;
  let fixture: ComponentFixture<AuthorsBookDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorsBookDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorsBookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
