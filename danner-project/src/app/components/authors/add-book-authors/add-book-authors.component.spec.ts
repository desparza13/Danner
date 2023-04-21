import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookAuthorsComponent } from './add-book-authors.component';

describe('AddBookAuthorsComponent', () => {
  let component: AddBookAuthorsComponent;
  let fixture: ComponentFixture<AddBookAuthorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBookAuthorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBookAuthorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
