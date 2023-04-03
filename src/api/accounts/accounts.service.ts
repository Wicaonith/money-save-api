import { Injectable, Logger } from '@nestjs/common';
import { AccountParamsDto } from 'src/models/dto/params/account-params.dto';
import { AccountsMetier } from 'src/metiers/accounts-metier/accounts.metier';
import { AccountDto } from 'src/models/dto/account.dto';
import { ReturnApi } from 'src/models/interfaces/return-api.interface';

/**
 * Classe Service liés aux Accounts
 *
 * @export
 * @class AccountsService
 */
@Injectable()
export class AccountsService {

  /**
   * Logger de la classe AccountsService
   * @private
   * @memberof AccountsService
   */
  private readonly logger = new Logger(AccountsService.name);

  /**
   * Creates an instance of AccountsService.
   * @param {AccountsMetier} accountsMetier - Service Metier Accounts
   * @memberof AccountsService
   */
  constructor(private accountsMetier: AccountsMetier) { }

  /**
   * Méthode permettant de créer un document dans la collection Accounts
   *
   * @param {AccountParamsDto} accountParamsDto - Objet Params Account
   * @return {*}  {Promise<ReturnApi>} - ReturnApi - Retour de l'API
   * @memberof AccountsService
   */
  public createAccount(accountParamsDto: AccountParamsDto): Promise<ReturnApi> {
    
    this.logger.log('[Account] - create() - ', { ...accountParamsDto });
    return this.accountsMetier.create(accountParamsDto);
  }

    /**
   * Méthode récupérant le document Account lié à l'id
   *
   * @param {string} id - Identifiant du document Accounts
   * @return {*}  {Promise<AccountDto>} - DTO Account
   * @memberof AccountsService
   */
     public findOneAccount(id: string) : Promise<AccountDto> {
      this.logger.log('[Account] - findById() - ' + id);
      return this.accountsMetier.findById(id);
    }

  /**
   * Méthode récupérant tous les documents Accounts lié à l'userId
   *
   * @param {string} userId - Identifiant utilisateur du document Accounts
   * @return {*}  {Promise<AccountDto[]>} - Liste de DTO Account
   * @memberof AccountsService
   */
  public findAllAccountByUser(userId: string): Promise<AccountDto[]> {

    this.logger.log('[Account] - findAllByUserId() - ' + userId);
    return this.accountsMetier.findAllByUserId(userId);
  }

  /**
   * Méthode permettant de mettre à jour le document Account lié à l'id
   *
   * @param {string} id - Identifiant du document Accounts
   * @param {AccountParamsDto} accountParamsDto - Objet Params Account
   * @return {*}  {Promise<ReturnApi>} - ReturnApi - Retour de l'API
   * @memberof AccountsService
   */
  public updateAccount(id: string, accountParamsDto: AccountParamsDto) : Promise<ReturnApi> {

    this.logger.log('[Account] - update() - ' + id + ' - ', { ...accountParamsDto });
    return this.accountsMetier.update(id, accountParamsDto);
  }

  /**
   * Méthode permettant de supprimer le document Account lié à l'id
   *
   * @param {string} id - Identifiant du document Accounts
     * @return {*}  {Promise<ReturnApi>} - ReturnApi - Retour de l'API
   * @memberof AccountsService
   */
  public async removeAccount(id: string): Promise<ReturnApi> {

    this.logger.log('[Account] - delete() - ' + id);

    // Récupération du userId lié au document Account 
    const account = await this.accountsMetier.findById(id);

    // Doit supprimer l'objet Account associé à l'ID
    const retour = this.accountsMetier.delete(id);

    // Doit mettre à jour tout les displayOrder des comptes
    this.accountsMetier.updateAllDisplayOrder(account.userId);

    return retour;
  }

  /**
   * Méthode permettant de supprimer les documents Accounts lié à l'userId
   *
   * @param {string} userId - Identifiant utilisateur du document Accounts
     * @return {*}  {Promise<ReturnApi>} - ReturnApi - Retour de l'API
   * @memberof AccountsService
   */
  public removeAllAccountByUser(userId: string) : Promise<ReturnApi> {
    this.logger.log('[Account] - deleteAllByUser() - ' + userId);
    return this.accountsMetier.deleteAllByUser(userId);
  }
}
