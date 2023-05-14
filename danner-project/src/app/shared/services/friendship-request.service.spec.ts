import { TestBed } from '@angular/core/testing';

import { FriendshipRequestService } from './friendship-request.service';

describe('FriendshipRequestService', () => {
  let service: FriendshipRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriendshipRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
