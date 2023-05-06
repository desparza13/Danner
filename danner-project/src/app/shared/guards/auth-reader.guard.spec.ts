import { TestBed } from '@angular/core/testing';

import { AuthReaderGuard } from './auth-reader.guard';

describe('AuthReaderGuard', () => {
  let guard: AuthReaderGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthReaderGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
