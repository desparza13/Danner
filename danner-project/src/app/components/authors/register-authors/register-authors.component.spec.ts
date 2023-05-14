import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAuthorsComponent } from './register-authors.component';

describe('RegisterAuthorsComponent', () => {
  let component: RegisterAuthorsComponent;
  let fixture: ComponentFixture<RegisterAuthorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterAuthorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterAuthorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
