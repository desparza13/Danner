import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAuthorsComponent } from './login-authors.component';

describe('LoginAuthorsComponent', () => {
  let component: LoginAuthorsComponent;
  let fixture: ComponentFixture<LoginAuthorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginAuthorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginAuthorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
