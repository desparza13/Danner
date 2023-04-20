import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavReadersComponent } from './nav-readers.component';

describe('NavReadersComponent', () => {
  let component: NavReadersComponent;
  let fixture: ComponentFixture<NavReadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavReadersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavReadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
