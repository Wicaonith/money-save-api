import { Test, TestingModule } from '@nestjs/testing';
import { PictogramsMetier } from './pictograms.metier';

describe('PictogramsMetier', () => {

  let service: PictogramsMetier;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PictogramsMetier],
    }).compile();

    service = module.get<PictogramsMetier>(PictogramsMetier);
  });

  describe('Method: create', () => {
    it('should create an pictogram', () => {
      expect(service).toBeDefined();
    });

    it('should failed create an pictogram', () => {
      expect(service).toBeDefined();
    });
  });
});
