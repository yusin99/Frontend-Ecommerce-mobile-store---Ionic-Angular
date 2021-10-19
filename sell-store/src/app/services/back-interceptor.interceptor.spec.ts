import { TestBed } from '@angular/core/testing';

import { BackInterceptorInterceptor } from './back-interceptor.interceptor';

describe('BackInterceptorInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [BackInterceptorInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: BackInterceptorInterceptor = TestBed.inject(
      BackInterceptorInterceptor
    );
    expect(interceptor).toBeTruthy();
  });
});
