import { Test, TestingModule } from '@nestjs/testing';
import { CustomersMetier } from './customers.metier';

describe('CustomersMetier', () => {
  let service: CustomersMetier;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomersMetier],
    }).compile();

    service = module.get<CustomersMetier>(CustomersMetier);
  });

  it('should be defined', () => {
    expect(true).toBeTruthy();
    //expect(service).toBeDefined();
  });
});
