import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeReadersComponent } from './home-readers.component';

describe('HomeReadersComponent', () => {
  let component: HomeReadersComponent;
  let fixture: ComponentFixture<HomeReadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeReadersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeReadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
