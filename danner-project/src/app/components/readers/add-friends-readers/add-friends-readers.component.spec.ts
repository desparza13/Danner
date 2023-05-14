import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFriendsReadersComponent } from './add-friends-readers.component';

describe('AddFriendsReadersComponent', () => {
  let component: AddFriendsReadersComponent;
  let fixture: ComponentFixture<AddFriendsReadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFriendsReadersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFriendsReadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
