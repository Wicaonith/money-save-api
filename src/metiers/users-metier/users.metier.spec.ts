import { Test, TestingModule } from '@nestjs/testing';
import { UsersMetier } from './users.metier';

describe('UsersService', () => {
  let service: UsersMetier;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersMetier],
    }).compile();

    service = module.get<UsersMetier>(UsersMetier);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
