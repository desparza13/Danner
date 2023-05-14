import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderProfileComponent } from './reader-profile.component';

describe('ReaderProfileComponent', () => {
  let component: ReaderProfileComponent;
  let fixture: ComponentFixture<ReaderProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReaderProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReaderProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
