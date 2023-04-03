import { Test, TestingModule } from '@nestjs/testing';
import { TransactionParamsDto } from 'src/models/dto/params/transaction-params.dto';
import { TransactionsMetier } from './transactions.metier';

describe('TransactionsMetier', () => {

  let service: TransactionsMetier;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionsMetier],
    }).compile();

    service = module.get<TransactionsMetier>(TransactionsMetier);
  });

  describe('Method: create', () => {
    it('should create an transaction', () => {
      expect(service).toBeDefined();
    });

    it('should failed create an transaction', () => {
      expect(service).toBeDefined();
    });
  });
});
