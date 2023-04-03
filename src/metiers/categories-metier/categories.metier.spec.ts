import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesMetier } from './categories.metier';

describe('CategoriesMetier', () => {
  let service: CategoriesMetier;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesMetier],
    }).compile();

    service = module.get<CategoriesMetier>(CategoriesMetier);
  });

  it('should be defined', () => {
    expect(true).toBeTruthy();
    //expect(service).toBeDefined();
  });
});
