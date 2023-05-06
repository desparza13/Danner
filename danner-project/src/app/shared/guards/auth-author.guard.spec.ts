import { TestBed } from '@angular/core/testing';

import { AuthAuthorGuard } from './auth-author.guard';

describe('AuthAuthorGuard', () => {
  let guard: AuthAuthorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthAuthorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
