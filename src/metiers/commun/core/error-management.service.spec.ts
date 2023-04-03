import { Test, TestingModule } from '@nestjs/testing';
import { ErrorManagementService } from './error-management.service';

describe('ErrorManagementService', () => {
  let service: ErrorManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ErrorManagementService],
    }).compile();

    service = module.get<ErrorManagementService>(ErrorManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
