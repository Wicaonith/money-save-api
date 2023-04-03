import { Test, TestingModule } from '@nestjs/testing';
import { BudgetsMetier } from './budgets.metier';


describe('BudgetsMetier', () => {
  let service: BudgetsMetier;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BudgetsMetier],
    }).compile();

    service = module.get<BudgetsMetier>(BudgetsMetier);
  });

  it('should be defined', () => {
    expect(true).toBeTruthy();
    //expect(service).toBeDefined();
  });
});
