import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsReadersComponent } from './friends-readers.component';

describe('FriendsReadersComponent', () => {
  let component: FriendsReadersComponent;
  let fixture: ComponentFixture<FriendsReadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsReadersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendsReadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
