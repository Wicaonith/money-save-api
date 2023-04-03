import { Injectable, Logger } from '@nestjs/common';
import { PictogramsMetier } from 'src/metiers/pictograms-metier/pictograms.metier';
import { PictogramDto } from 'src/models/dto/pictogram.dto';

/**
 * Classe Service liés aux Pictograms
 *
 * @export
 * @class PictogramsService
 */
@Injectable()
export class PictogramsService {

  /**
   * Logger de la classe PictogramsService
   * @private
   * @memberof PictogramsService
   */
  private readonly logger = new Logger(PictogramsService.name);

  /**
   * Creates an instance of PictogramsService.
   * @param {PictogramsMetier} pictogramsMetier - Service Metier Pictograms
   * @memberof PictogramsService
   */
  constructor(private pictogramsMetier: PictogramsMetier) { }

  /**
   * Méthode récupérant tous les documents Pictograms lié à l'userId
   *
   * @param {string} userId - Identifiant utilisateur du document Pictograms
   * @return {*}  {Promise<PictogramDto[]>} - Liste de DTO Pictogram
   * @memberof PictogramsService
   */
  public findAllPictogram(): Promise<PictogramDto[]> {

    this.logger.log('[Pictogram] - findAllPictogram()');
    return this.pictogramsMetier.findAll();
  }
}
