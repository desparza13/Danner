import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginReadersComponent } from './login-readers.component';

describe('LoginReadersComponent', () => {
  let component: LoginReadersComponent;
  let fixture: ComponentFixture<LoginReadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginReadersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginReadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
