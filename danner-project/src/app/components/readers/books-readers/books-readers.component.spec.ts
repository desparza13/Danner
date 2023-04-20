import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksReadersComponent } from './books-readers.component';

describe('BooksReadersComponent', () => {
  let component: BooksReadersComponent;
  let fixture: ComponentFixture<BooksReadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksReadersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksReadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
