import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterReadersComponent } from './register-readers.component';

describe('RegisterReadersComponent', () => {
  let component: RegisterReadersComponent;
  let fixture: ComponentFixture<RegisterReadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterReadersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterReadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
