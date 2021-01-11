import { TestBed } from '@angular/core/testing';

import { ReproNotasService } from './repro-notas.service';

describe('ReproNotasService', () => {
  let service: ReproNotasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReproNotasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
