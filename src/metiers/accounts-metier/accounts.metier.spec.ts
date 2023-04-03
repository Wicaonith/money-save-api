import { Test, TestingModule } from '@nestjs/testing';
import { AccountParamsDto } from 'src/models/dto/params/account-params.dto';
import { AccountsMetier } from './accounts.metier';

describe('AccountsMetier', () => {

  let service: AccountsMetier;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountsMetier],
    }).compile();

    service = module.get<AccountsMetier>(AccountsMetier);
  });

  describe('Method: create', () => {
    it('should create an account', () => {
      expect(service).toBeDefined();

      let accountParamsDto: AccountParamsDto = {
        fId : '74115464864648',
        userId : '1',
        label : 'Livret A',
        typeAccount : 'Epargne',
        displayOrder: 1
      };
      /*let retour: ReturnApi = {
        success: true,
        code: CodeError.FC0001_D0003,
        message: 'Account creation failed.'
      };*/
      expect(service.create(accountParamsDto)).toReturn();
    });

    it('should failed create an account', () => {
      expect(service).toBeDefined();
    });
  });
});
